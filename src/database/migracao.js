import fs from "fs"; // File sistem
import path from "path"; // lida com caminhos no sistema operacional
import { fileURLToPath } from "url"; // Função do módulo Url que transforma um caminho de tipo file em caminho normal de sistema de aquivos
import { dirname } from "path"; //Função dirname para obter o diretorio path, simular __dirname
import { openDb } from "../helpers/configdb.js"; // conexão banco

const __filename = fileURLToPath(import.meta.url); // converte a url do arquivo(import.meta.url) em caminho de arquivo comum
const __dirname = dirname(__filename); // usado para pegar apenas o diretorio de onde tá o arquivo

async function fazerMigracoes() {
  const db = await openDb();

  const arquivos = fs.readdirSync(path.resolve(__dirname, "migrations")).sort(); // faz uma leitura sincronizada de todos os arquivos da pasta migrations ordenando pelo timestamp e nome, armazena o arquivo

  // inicia um simples laço que percorre cada um dos arquivos da pasta migrations
  for (let file of arquivos) {
    // le o codigo sql do arquivo e armazena nna variavel sql
    const sql = fs.readFileSync(
      path.resolve(__dirname, "migrations", file),
      "utf8"
    );
    // Finalmente executa cada comando do sql armazenado no banco de dados
    db.exec(sql, (erro) => {
      if (erro) throw new Error("Erro ao fazer migração!");
      console.log(`Migração ${file} aplicada com sucesso!`);
    });
  }
}

fazerMigracoes(); // chama a função

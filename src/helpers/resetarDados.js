import { openDb } from "./configdb.js";

async function ResetarDados() {
  try {
    const db = await openDb();

    await db.exec("DELETE FROM movimentacao");
    await db.exec("DELETE FROM produto");

    // Reinicia os IDs se quiser (autoincrement)
    await db.exec("DELETE FROM sqlite_sequence WHERE name='movimentacao'");
    await db.exec("DELETE FROM sqlite_sequence WHERE name='produto'");

    console.log("Todos os dados das tabelas foram resetados com sucesso!");
  } catch (error) {
    console.error(
      "Não foi possível apagar todos os dados do banco de dados!",
      error
    );
  }
}

ResetarDados();

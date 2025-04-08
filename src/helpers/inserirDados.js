import { openDb } from "./configdb.js";

async function InserirDados() {
  try {
    const db = await openDb();

    // Armazenas os produtos que serão inseridos
    const produtos = [
      {
        descricao: "Arroz branco",
        quantidade: 100,
        unidade: "kg",
        quantidade_embalagem: 10,
      },
      {
        descricao: "Feijão preto",
        quantidade: 200,
        unidade: "kg",
        quantidade_embalagem: 20,
      },
      {
        descricao: "Macarrão tipo penne",
        quantidade: 150,
        unidade: "kg",
        quantidade_embalagem: 15,
      },
      {
        descricao: "Açúcar cristal",
        quantidade: 300,
        unidade: "kg",
        quantidade_embalagem: 30,
      },
      {
        descricao: "Café em pó",
        quantidade: 0,
        unidade: "kg",
        quantidade_embalagem: 8,
      },
    ];

    //função simples que percorre cada produto do array e insere no banco
    for (const produto of produtos) {
      await db.run(
        `INSERT INTO produto 
         (descricao, quantidade, unidade, quantidade_embalagem) 
         VALUES (?, ?, ?, ?)`,
        [
          produto.descricao,
          produto.quantidade,
          produto.unidade,
          produto.quantidade_embalagem,
        ]
      );
    }

    console.log("Dados inseridos com sucesso!");
  } catch (error) {
    console.error("Erro ao inserir dados no banco de dados!", error);
  }
}

InserirDados();

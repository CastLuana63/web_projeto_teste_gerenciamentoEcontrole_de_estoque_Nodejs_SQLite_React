import sqlite3 from "sqlite3";
import { open } from "sqlite";
import path from "path";

/*
 - Abre a conexão com o banco de dados SQLite.
 - O arquivo do banco esta localizado em: src/database/database.db
 */
export async function openDb() {
  try {
    const db = await open({
      filename: path.resolve("src", "database", "database.db"),
      driver: sqlite3.Database,
    });

    return db;
  } catch (error) {
    console.error("Erro ao conectar com o banco de dados:", error.message);
    throw error;
  }
}

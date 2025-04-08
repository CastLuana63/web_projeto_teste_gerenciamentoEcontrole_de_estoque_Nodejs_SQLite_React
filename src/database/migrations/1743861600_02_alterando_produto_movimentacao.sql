DROP TABLE IF EXISTS movimentacao;

DROP TABLE IF EXISTS produto;

CREATE TABLE
    IF NOT EXISTS produto (
        id_produto INTEGER PRIMARY KEY AUTOINCREMENT,
        descricao TEXT NOT NULL,
        quantidade INTEGER DEFAULT 0,
        unidade TEXT NOT NULL,
        quantidade_embalagem INTEGER DEFAULT 0,
        disponivel BOOLEAN DEFAULT TRUE
    );

CREATE TABLE
    IF NOT EXISTS movimentacao (
        id_movimentacao INTEGER PRIMARY KEY AUTOINCREMENT,
        data_movimentacao TEXT NOT NULL,
        id_produto INTEGER NOT NULL,
        quantidade INTEGER DEFAULT 0,
        justificativa TEXT,
        tipo_movimentacao TEXT NOT NULL CHECK (tipo_movimentacao IN ('Entrada', 'Saída')),
        FOREIGN KEY (id_produto) REFERENCES produto (id_produto)
    );

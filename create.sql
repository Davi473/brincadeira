CREATE TABLE usuarios (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  hash TEXT NOT NULL,
  createdat DATE DEFAULT CURRENT_DATE
);

CREATE TABLE ativo (
  id TEXT PRIMARY KEY,
  ticket TEXT NOT NULL,
  tipo TEXT NOT NULL
);

CREATE TABLE lancamento (
  id TEXT PRIMARY KEY,
  id_ativo TEXT REFERENCES ativo(id),
  id_usuario TEXT REFERENCES usuarios(id) ON DELETE CASCADE,
  quantidade INT NOT NULL,
  preco NUMERIC, 
  data DATE,
  compra BOOLEAN
);

CREATE TABLE ativo_carteira (
  id SERIAL PRIMARY KEY,
  id_ativo TEXT REFERENCES ativo(id), 
  id_usuario TEXT REFERENCES usuarios(id) ON DELETE CASCADE,
  quantidade INT NOT NULL,
  media NUMERIC  
);
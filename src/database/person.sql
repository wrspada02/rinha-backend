CREATE TABLE IF NOT EXISTS PERSON (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    apelido VARCHAR NOT NULL,
    nome VARCHAR NOT NULL,
    nascimento VARCHAR NOT NULL,
    stack TEXT[] NOT NULL
);

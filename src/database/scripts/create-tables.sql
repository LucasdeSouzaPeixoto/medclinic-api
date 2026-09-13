-- Script de criação da estrutura de tabelas da MedClinic API
-- Etapa 1: Autenticação e Autorização

CREATE TYPE usuarios_role_enum AS ENUM ('admin', 'atendente');

CREATE TABLE IF NOT EXISTS usuarios (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nome VARCHAR(150) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    senha VARCHAR NOT NULL,
    role usuarios_role_enum NOT NULL DEFAULT 'atendente',
    created_at TIMESTAMP NOT NULL DEFAULT now()
);
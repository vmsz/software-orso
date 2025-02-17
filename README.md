# Aviso!

É necessário para o funcionamento do backend a instalação da extensão unaccent no PostgreSQL - Comando: CREATE EXTENSION IF NOT EXISTS "unaccent"

O Backend cria automaticamente todas as tabelas no PostgreSQL, basta criar manualmente o banco de dados (não as tabelas)
e trocar as informações necessárias em backend/config/database.js

Os arquivos em sql que estão presentes em /database apenas populam o banco de dados e servem APENAS para o PostgreSQL.

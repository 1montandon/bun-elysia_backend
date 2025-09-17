
# Bun & Elysia Backend

Este projeto é uma aplicação de estudos desenvolvida para explorar o uso do [Bun](https://bun.sh/) e [Elysia](https://elysiajs.com/) pela primeira vez. O objetivo é aprender sobre performance, rotas, autenticação e integração com banco de dados utilizando tecnologias modernas em JavaScript/TypeScript.

## Sobre o Projeto
Este backend implementa rotas de autenticação e manipulação de dados usando Bun como runtime e Elysia como framework HTTP. O banco de dados utilizado é SQLite, gerenciado via Drizzle ORM.

## Tecnologias Utilizadas
| Tecnologia   | Descrição                                 |
|-------------|--------------------------------------------|
| Bun         | Runtime JavaScript/TypeScript rápido       |
| Elysia      | Framework HTTP moderno para Bun            |
| Drizzle ORM | ORM para bancos relacionais                |
| SQLite      | Banco de dados leve e embutido             |
| TypeScript  | Tipagem estática para JavaScript           |

## Estrutura de Pastas
```
bun.lock
package.json
README.md
drizzle.config.ts
mydb.sqlite
tsconfig.json
reqs.http
src/
	index.ts
	db/
		client.ts
		schema.ts
	routes/
		auth.ts
drizzle/
	0000_salty_kree.sql
	meta/
		_journal.json
		0000_snapshot.json
```

## Como Executar

1. **Instale as dependências:**
	 ```bash
	 bun install
	 ```
2. **Execute as migrações do banco:**
	 ```bash
	 npx drizzle-kit migrate
	 ```
3. **Inicie o servidor:**
	 ```bash
	 bun run src/index.ts
	 ```

## Exemplo de Requisição
Arquivo `reqs.http` para autenticação:
```http
POST http://localhost:3000/auth/login
Content-Type: application/json

{
		"email": "seu_email@exemplo.com"
}
```

## Licença
Este projeto é apenas para fins de estudo e não possui licença comercial.
# Back-End GoBarber

## 1. Instalação

Necessário estar com o Node JS versão 12 instalado.

Executar o comando abaixo para instalar as dependências:

Utilizando Yarn:

```
yarn install
```

Utilizando NPM:

```
npm install
```

## 2. Executar no ambiente de desenvolvimento

Inicie o banco de dados local com SQLite. Execute o comando abaixo para realizar as migrações:

Utilizando Yarn:

```
yarn typeorm migration:run
```

Utilizando NPM:

```
npm typeorm migration:run
```

Inicie o servidor de desenvolvimento com o seguinte comando:

Utilizando Yarn:

```
yarn dev
```

Utilizando NPM:

```
npm dev
```

## Revertendo migrações no banco de dados

Para reverter as migrações no banco de dados no ambiente de desenvolvimento execute o comando abaixo:

Utilizando Yarn:

```
yarn typeorm migration:revert
```

Utilizando NPM:

```
npm typeorm migration:revert
```

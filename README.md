<p align="center"><img src="https://gflixview.vercel.app/assets/logo-glix.png" alt="project-image"></p>

<p id="description">Este projeto foi desenvolvido como parte do Desafio Elite Dev com o objetivo de demonstrar habilidades técnicas em desenvolvimento Front-End e Back-End. A aplicação é uma Lista de Filmes que permite aos usuários pesquisar visualizar detalhes e gerenciar uma lista de filmes favoritos. Utilizando a API do The Movie Database (TMDb)</p>

<div align="left"> 
<details>
  <summary>Sumario</summary>
  <ol>
    <li><a href="#demo">Demo</a> </li>
    <li><a href="#installation">Installation Steps</a></li>
    <li><a href="#built">Built with</a></li>
    <li><a href="#endpoints">Endpoints</a></li>
  </ol>
</details>
</div>

<div id="demo"></div>
<h2>🚀 Demo</h2>

[https://gflixview.vercel.app](https://gflixview.vercel.app)

login de teste > usuario@teste.com - senha: usuario

\*obs : alguns itens no menu, como links do footer e botão de cadastro ainda não foi implementado, utilizar apenas login de teste.

<div id="installation"></div>
<h2>🛠️ Installation Steps:</h2>

<p>1. Baixar repositório</p>
<br>
<p>2. Ter postgreSQL instalado</p>

```
https://www.postgresql.org/download/
```

<br>
<p>3. Criar um database</p>

```
jdbc:postgresql://localhost:5432/gflixdb
```

<br>
<p>4. Rodar DDL para criação da tabela utilizada</p>

```sql
CREATE TABLE public.tb_mylist (
    id uuid DEFAULT uuid_generate_v4() NOT NULL
    token_list uuid NOT NULL
    movie_id int4 NULL
    tv_show_id int4 NULL
    "date" timestamp NULL
    user_id varchar NULL
    CONSTRAINT tb_mylist_pkey PRIMARY KEY (id) );
```

<br>
<p>5. Acessar a pasta do backend gflix-webservice/gflixwebservice adicionar sua API-KEY-TMDB no properties e rodar a aplicação </p>

```
mvn spring-boot:run
```
* Sua key do tmdb voce consegue acessando o site https://www.themoviedb.org realizando o cadastro e acessando https://www.themoviedb.org/settings/api 


<br>
<p>6. Acessar a pasta do front-end gflix-view via terminal ou vscode e rodar os comandos</p>

```
npm i
```

```
ng serve
```

<br>
<p>8. Aplicação estará rodando webservice na porta 8080 e view na 4200</p>

<div id="built"></div>
<h2>💻 Built with</h2>

Technologies used in the project:

- Angular 18
- Spring boot
- PostgreSql

<div id="endpoints"></div>
<h2>🌐 Endpoints</h2>

### 1. **Obter Lista de Favoritos**

- **URL:** `/gflix/myList`
- **Método:** `GET`
- **Parâmetros:**
  - `tokenList` (opcional): UUID da lista de favoritos.
  - `userId` (opcional): ID do usuário.

A lista pode ser buscada pelo userId ou pelo tokenList caso for lista compartilhada.

#### Exemplo de uso com `curl`:

```bash
curl -X GET "https://api.gflix.fun/gflix/myList?tokenList=<tokenList>&userId=<userId>" \
  -H "Content-Type: application/json"
```

Possíveis Respostas:

- 200 OK: Lista de favoritos retornada com sucesso.

```json
[
  {
    "id": 123,
    "title": "Movie Title",
    "overview": "Movie overview...",
    "poster": "/path/to/poster.jpg",
    "backdrop": "/path/to/backdrop.jpg",
    "genres": ["Action", "Adventure"],
    "tokenList": "uuid-token"
  },
  {
    "id": 456,
    "title": "TV Show Title",
    "overview": "TV show overview...",
    "poster": "/path/to/poster.jpg",
    "backdrop": "/path/to/backdrop.jpg",
    "genres": ["Drama"],
    "tokenList": "uuid-token"
  }
]
```

- 409 CONFLICT: Erro ao buscar a lista de favoritos.

```json
{
  "message": "Erro ao buscar sua lista"
}
```

### 2. **Adicionar Item à Lista de Favoritos**

- **URL**: `/gflix/setItemList`
- **Método**: `POST`
- Corpo da Requisição:
  - JSON com as propriedades de MyListDTO.

#### Exemplo de uso com `curl`:

```bash
curl -X POST "https://api.gflix.fun/gflix/setItemList" \
  -H "Content-Type: application/json" \
  -d '{
        "userId": "user123",
        "movieId": 123,
        "tvShowId": null,
        "tipo": "MOVIE",
        "tokenList": "optional-uuid-token"
      }'
```

Possíveis Respostas:

- 201 CREATED: Item adicionado com sucesso.

```json
{
  "id": 789,
  "userId": "user123",
  "movieId": 123,
  "tvShowId": null,
  "tipo": "MOVIE",
  "date": "2024-09-03T10:15:30Z",
  "tokenList": "uuid-token"
}
```

- 409 CONFLICT: Erro ao salvar o item.

```json
{
  "message": "Erro ao salvar item"
}
```

### 3. **Remover Item da Lista de Favoritos**

- **URL**: `/gflix/deleteItemList`
- **Método**: `DELETE`
- Corpo da Requisição:
  - JSON com as propriedades de MyListDTO.

#### Exemplo de uso com `curl`:

```bash
curl -X DELETE "https://api.gflix.fun/gflix/deleteItemList" \
  -H "Content-Type: application/json" \
  -d '{
        "userId": "user123",
        "movieId": 123,
        "tvShowId": null,
        "tipo": "MOVIE",
        "tokenList": "optional-uuid-token"
      }'
```

Possíveis Respostas:

- 200 OK: Item removido com sucesso.

```json
{
  "message": "Item removido"
}
```

409 CONFLICT: Erro ao deletar o item.

```json
{
  "message": "Erro ao deletar item"
}
```

## EndPoints relacionado aos filmes e series

### 1. **Obter Filmes Populares**

- **URL**: `/api/movies`
- **Método**: GET
- **Parâmetros**:
  - page (opcional, padrão: 1): Número da página dos resultados.
  - userId (opcional): ID do usuário para verificar favoritos.

Retorna uma lista de filmes populares. Se userId for fornecido, os filmes marcados como favoritos serão indicados.

### Exemplo de uso com `curl`:

```bash
curl -X GET "https://api.gflix.fun/api/movies?page=1&userId=<userId>" \
  -H "Content-Type: application/json"
```

Possíveis Respostas:

200 OK: Lista de filmes populares retornada com sucesso.

```json
[
  {
    "id": 123,
    "title": "Movie Title",
    "overview": "Movie overview...",
    "poster": "/path/to/poster.jpg",
    "backdrop": "/path/to/backdrop.jpg",
    "genres": ["Action", "Adventure"],
    "isFavorite": true
  }
]
```

409 CONFLICT: Erro ao buscar filmes.

```json
{
  "message": "Erro ao buscar filmes"
}
```

### 2. **Obter Séries Populares**

- **URL**: `/api/tvshows`
- **Método**: GET
- **Parâmetros**:
  - page (opcional, padrão: 1): Número da página dos resultados.
  - userId (opcional): ID do usuário para verificar favoritos.

Retorna uma lista de séries populares. Se userId for fornecido, as séries marcadas como favoritas serão indicadas.

### Exemplo de uso com `curl`:

```bash
curl -X GET "https://api.gflix.fun/api/tvshows?page=1&userId=<userId>" \
  -H "Content-Type: application/json"
```

Possíveis Respostas:

200 OK: Lista de séries populares retornada com sucesso.

```json
[
  {
    "id": 456,
    "title": "TV Show Title",
    "overview": "TV show overview...",
    "poster": "/path/to/poster.jpg",
    "backdrop": "/path/to/backdrop.jpg",
    "genres": ["Drama"],
    "isFavorite": false
  }
]
```

409 CONFLICT: Erro ao buscar séries.

```json
{
  "message": "Erro ao buscar series"
}
```

### 3. **Obter Filme por ID**

- **URL**: /api/`movieById/{id}`
- **Método**: GET
- **Parâmetros**:
  - userId (opcional): ID do usuário para verificar se o filme é favorito.
  - Retorna detalhes de um filme específico por ID. Se userId for fornecido, indica se o filme é favorito.

### Exemplo de uso com `curl`:

```bash
curl -X GET "https://api.gflix.fun/api/movieById/123?userId=<userId>" \
  -H "Content-Type: application/json"
```

Possíveis Respostas:

200 OK: Detalhes do filme retornados com sucesso.

```json
{
  "id": 123,
  "title": "Movie Title",
  "overview": "Movie overview...",
  "poster": "/path/to/poster.jpg",
  "backdrop": "/path/to/backdrop.jpg",
  "genres": ["Action", "Adventure"],
  "isFavorite": true
}
```

409 CONFLICT: Erro ao buscar o filme.

```json
{
  "message": "Erro ao buscar o filme"
}
```

### 4. **Obter Série por ID**

- **URL**: /api/`tvById/{id}`
- **Método**: GET
- **Parâmetros**:
  - userId (opcional): ID do usuário para verificar se a série é favorita.
  - Retorna detalhes de uma série específica por ID. Se userId for fornecido, indica se a série é favorita.

### Exemplo de uso com `curl`:

```bash
curl -X GET "https://api.gflix.fun/api/tvById/456?userId=<userId>" \
  -H "Content-Type: application/json"
```

Possíveis Respostas:

200 OK: Detalhes da série retornados com sucesso.

```json
{
  "id": 456,
  "title": "TV Show Title",
  "overview": "TV show overview...",
  "poster": "/path/to/poster.jpg",
  "backdrop": "/path/to/backdrop.jpg",
  "genres": ["Drama"],
  "isFavorite": false
}
```

409 CONFLICT: Erro ao buscar a série.

```json
{
  "message": "Erro ao buscar o filme"
}
```

### 5. **Buscar Filmes por Termo**

- **URL**: `/api/movieBySearch`
- **Método**: POST
- **Parâmetros**:

  - page (opcional, padrão: 1): Número da página dos resultados.
  - userId: ID do usuário para verificar favoritos.

- Corpo da Requisição:
  - String de busca (searchQuery).

Retorna filmes baseados no termo de busca fornecido. Se userId for fornecido, indica se os filmes são favoritos.

### Exemplo de uso com `curl`:

```bash
curl -X POST "https://api.gflix.fun/api/movieBySearch?page=1&userId=<userId>" \
  -H "Content-Type: application/json" \
  -d '"search term"'
```

Possíveis Respostas:

200 OK: Filmes encontrados com base no termo de busca.

```json
[
  {
    "id": 123,
    "title": "Movie Title",
    "overview": "Movie overview...",
    "poster": "/path/to/poster.jpg",
    "backdrop": "/path/to/backdrop.jpg",
    "genres": ["Action", "Adventure"],
    "isFavorite": true
  }
]
```

409 CONFLICT: Erro ao buscar filmes.

```json
{
  "message": "Erro ao buscar o filme"
}
```

### 6. **Buscar Séries por Termo**

- **URL**: `/api/tvBySearch`
- **Método**: POST
- **Parâmetros**:
  - page (opcional, padrão: 1): Número da página dos resultados.
  - userId: ID do usuário para verificar favoritos.
- Corpo da Requisição:
  - String de busca (searchQuery).

Retorna séries baseadas no termo de busca fornecido. Se userId for fornecido, indica se as séries são favoritas.

### Exemplo de uso com `curl`:

```bash
curl -X POST "https://api.gflix.fun/api/tvBySearch?page=1&userId=<userId>" \
  -H "Content-Type: application/json" \
  -d '"search term"'
```

Possíveis Respostas:

200 OK: Séries encontradas com base no termo de busca.

```json
[
  {
    "id": 456,
    "title": "TV Show Title",
    "overview": "TV show overview...",
    "poster": "/path/to/poster.jpg",
    "backdrop": "/path/to/backdrop.jpg",
    "genres": ["Drama"],
    "isFavorite": false
  }
]
```

409 CONFLICT: Erro ao buscar séries.

```json
{
  "message": "Erro ao buscar o filme"
}
```

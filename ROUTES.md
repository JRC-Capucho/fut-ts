# API de Gerenciamento de Campeonatos de Futebol

## Endpoints

### Usuários

#### POST `/users`

Cria um novo usuário.

**Corpo da Solicitação (JSON):**

```json
{
  "email": "email",
  "name": "nome",
  "password": "senha"
}
```

#### PUT `/users`

Atualiza um usuário existente.

**Corpo da Solicitação (JSON):**

```json
{
  "email": "email",
  "name": "nome",
  "password": "senha"
}
```

### Autenticação

#### POST `/login`

Autentica um usuário e retorna um token de acesso.

**Corpo da Solicitação (JSON):**

```json
{
  "email": "email",
  "password": "senha"
}
```

**Nota:** Apartir desse endpoint requer autenticação.

### Jogadores

#### GET `/players`

Lista todos os jogadores.

#### GET `/players/{id}`

Lista jogadores por equipe.

**URL Params:**

- `id=[integer]`

#### POST `/players`

Cria um novo jogador.

**Corpo da Solicitação (JSON):**

```json
{
  "name": "nome",
  "shirtNumber": "numero da camiseta",
  "teamsId": "id do time"
}
```

#### PUT `/players/{id}`

Atualiza um jogador existente.

**URL Params:**

- `id=[integer]`

**Corpo da Solicitação (JSON):**

```json
{
  "name": "nome",
  "shirtNumber": "numero da camiseta",
  "teamsId": "id do time"
}
```

#### DELETE `/players/{id}`

Remove um jogador.

**URL Params:**

- `id=[integer]`

### Times

#### POST `/teams`

Cria um novo time.

**Corpo da Solicitação (JSON):**

```json
{
  "name": "nome",
  "leagueId": "id da liga"
}
```

#### GET `/teams`

Lista todos os times.

#### PUT `/teams/{id}`

Atualiza um time existente.

**URL Params:**

- `id=[integer]`

**Corpo da Solicitação (JSON):**

```json
{
  "name": "nome"
}
```

#### DELETE `/teams/{id}`

Remove um time.

**URL Params:**

- `id=[integer]`

### Ligas

#### GET `/leagues/{id}`

Retorna detalhes de uma liga específica.

**URL Params:**

- `id=[integer]`

#### POST `/leagues`

Cria uma nova liga.

**Corpo da Solicitação (JSON):**

```json
{
  "name": "nome",
  "start": "data de inicio",
  "end": "data do termino"
}
```

#### PUT `/leagues/{id}`

Atualiza uma liga existente.

**URL Params:**

- `id=[integer]`

**Corpo da Solicitação (JSON):**

```json
{
  "name": ""
}
```

#### DELETE `/leagues/{id}`

Remove uma liga.

**URL Params:**

- `id=[integer]`

### Partidas

#### POST `/matches`

Registra uma nova partida.

**Corpo da Solicitação (JSON):**

```json
{
  "day": "data",
  "start": "horario do inicio da partida",
  "end": "horario do termino previsto da partida",
  "leagueId": "id da liga",
  "homeTeam": "id do time",
  "awayTeam": "id do time"
}
```

#### PATCH `/matches/{id}`

Finaliza uma partida.

**URL Params:**

- `id=[integer]`

**Corpo da Solicitação (JSON):**

```json
{
  "players": [
    {
      "id": "id do jogador",
      "gols": "quantidade de gols"
    }
  ],
  "home_teams_scoreboard": "quantidade de gols",
  "away_teams_scoreboard": "quantidade de gols"
}
```

#### PUT `/matches/{id}`

Atualiza detalhes de uma partida.

**URL Params:**

- `id=[integer]`

**Corpo da Solicitação (JSON):**

```json
{
  "day": "data",
  "start": "horario do inicio da partida",
  "end": "horario do termino previsto da partida",
  "leagueId": "id da liga",
  "homeTeam": "id do time",
  "awayTeam": "id do time"
}
```

#### DELETE `/matches/{id}`

Remove uma partida.

**URL Params:**

- `id=[integer]`

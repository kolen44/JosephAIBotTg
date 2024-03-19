## Запуск PostgreSQL

`JosephAIBotTg_database` - имя контейнера
`POSTGRES_PASSWORD=password` - пароль от postgres пользователя

```bash
docker run --name JosephAIBotTg_database -e POSTGRES_PASSWORD=password -d -p 5432:5432 postgres
```

Далее заходим в контейнер

```bash
docker exec -it JosephAIBotTg_database bash
```

Заходим как postgres

```bash
psql -U postgres
```

### Если нету базы данных

Создаём базу \
`JosephAIBotTg_database` - имя базы данных

```sql
create database JosephAIBotTg_database;
```

Далее выбираем её

```bash
\c JosephAIBotTg_database
```

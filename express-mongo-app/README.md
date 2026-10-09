# Express MongoDB Todo API

A small REST API built with Express and MongoDB.

## API routes

| Method | Path | Description |
| --- | --- | --- |
| `GET` | `/health` | API and database health |
| `GET` | `/todos` | List todos |
| `POST` | `/todos` | Create a todo |
| `GET` | `/todos/:id` | Get one todo |
| `PATCH` | `/todos/:id` | Update a todo |
| `DELETE` | `/todos/:id` | Delete a todo |

Create a todo with JSON such as:

```json
{
  "title": "Learn Docker"
}
```

## Run locally

Copy `.env.example` to `.env` and set `MONGODB_URI` to your MongoDB connection string. Node.js 22 loads `.env` automatically when the app starts.

```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/todo_app
NODE_ENV=development
```

Then run:

```bash
npm start
```

## Build and run with Docker

The app uses the Debian-based `node:22-bookworm-slim` image. Docker selects the matching CPU architecture when you build on the target machine.

```bash
docker rm -f todo-api express-api
docker build --pull --no-cache -t express-api:latest .
docker network create todo-network
docker run -d --name mongo --network todo-network -v todo-data:/data/db mongo:8
docker run --rm --name express-api --network todo-network -p 3000:3000 --env-file .env express-api:latest
```

For the Docker network above, set `MONGODB_URI=mongodb://mongo:27017/todo_app` in `.env`. `localhost` inside the API container points to that same container, not MongoDB. If `todo-network` already exists, skip its `docker network create` command.

If `docker rm -f todo-api` says the container does not exist, continue to the build command. If it prints a Docker permission/pipeline error, start Docker Desktop and use a terminal that has access to its Linux engine.

To build for a different machine, set its architecture explicitly (choose one matching the destination host):

```bash
docker buildx build --platform linux/amd64 -t express-api:latest --load .
```

For an ARM64 host, replace `linux/amd64` with `linux/arm64`. To publish one image usable on both architectures, use `--platform linux/amd64,linux/arm64` with `--push` and a registry tag. The Dockerfile starts Node directly.

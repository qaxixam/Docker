# Debian-based Node image; verified to run on the Docker Linux engine.
FROM node:22-bookworm-slim

WORKDIR /app

COPY package*.json ./
RUN npm ci --omit=dev

COPY src ./src
COPY app.js ./app.js

ENV NODE_ENV=production
EXPOSE 3000

# Run Node directly, bypassing the base image's shell entrypoint script.
ENTRYPOINT ["node"]
CMD ["app.js"]

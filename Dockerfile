# Builder
FROM oven/bun:1.2.5 as builder

WORKDIR /app

COPY bun.lock package.json ./
RUN bun install

COPY . .
RUN bun run build

# Runtime
FROM oven/bun:1.2.5

WORKDIR /app

COPY bun.lock package.json ./
RUN bun install --production

COPY --from=builder /app/dist ./dist

EXPOSE 3000

CMD ["bun", "run", "start"]

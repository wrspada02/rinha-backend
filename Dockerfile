FROM oven/bun:latest

WORKDIR /app

COPY . .

RUN bun init
RUN bun install
RUN bun postinstall

CMD ["bun", "run", "src/main.ts"]
EXPOSE 3000

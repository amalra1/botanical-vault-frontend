FROM node:24-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

ARG _NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=$_NEXT_PUBLIC_API_URL

RUN test -n "$NEXT_PUBLIC_API_URL" \
    || (echo "ERROR: _NEXT_PUBLIC_API_URL must be passed with --build-arg" && exit 1)

RUN npm run build

FROM node:24-alpine

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

EXPOSE 3000

CMD ["node", "server.js"]

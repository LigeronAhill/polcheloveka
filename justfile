# https://just.systems

set windows-shell := ["pwsh", "-NoLogo", "-Command"]
set dotenv-filename := ".env.local"
set dotenv-load := true

mongo := env('MONGO_URL')

default:
    @echo "Mongo url '{{ mongo }}'"
    @just --list

watch:
    @pnpm dev

https:
    @pnpm dev:https

fix:
    @pnpm lint:fix

lint:
    @pnpm lint

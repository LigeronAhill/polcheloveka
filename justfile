# https://just.systems

export MONGO_URL := `skate get mongo@url`

default:
    @just --list

watch:
    @pnpm dev

https:
    @pnpm dev:https

fix:
    @pnpm lint:fix

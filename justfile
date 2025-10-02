# https://just.systems

export MONGO_URL := `skate get mongo@url`

default:
    @just --list

watch:
    @pnpm dev

fix:
    @pnpm lint:fix

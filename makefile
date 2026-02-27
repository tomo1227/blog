.PHONY: install
install:
	bun i

.PHONY: ci
ci:
	bun i --frozen-lockfile

.PHONY: update
update:
	bun update

.PHONY: run
run:
	bunx --bun vite

.PHONY: build
build:
	bun run build

.PHONY: up
up:
	docker compose up -d

.PHONY: down
down:
	docker compose down

.PHONY: prune
prune:
	docker system prune -a

.PHONY: delete
delete:
	docker-compose down --rmi all --volumes --remove-orphans

.PHONY: log
log:
	docker compose logs -f

.PHONY: css
css:
	bunx @tailwindcss/cli -i ./app/tailwind.css -o ./static/assets/tailwind.css --watch

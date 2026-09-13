.PHONY: front install dev build preview lint test help

# ─── Colours ──────────────────────────────────────────────────────────────────
BOLD  := \033[1m
GREEN := \033[32m
YELLOW:= \033[33m
RED   := \033[31m
RESET := \033[0m

# ─── Helpers ──────────────────────────────────────────────────────────────────
define log
	@printf "$(BOLD)$(GREEN)▶ $(1)$(RESET)\n"
endef

# ─── Main target ──────────────────────────────────────────────────────────────

## front: Full startup — installs deps and runs the dev server
front: _check-node install dev

# ─── Individual targets ───────────────────────────────────────────────────────

## install: Install npm dependencies (skips if node_modules is up to date)
install:
	$(call log,Checking dependencies...)
	@npm install

## dev: Start the Vite development server
dev:
	$(call log,Starting dev server → http://localhost:5173)
	@npm run dev

## build: Production build
build:
	$(call log,Building for production...)
	@npm run build

## preview: Preview the production build locally
preview:
	$(call log,Starting preview server → http://localhost:4173)
	@npm run preview

## lint: Lint the source code
lint:
	$(call log,Linting...)
	@npm run lint

## test: Run contract tests
test:
	$(call log,Running contract tests...)
	@npm run test:contract

# ─── Guards ───────────────────────────────────────────────────────────────────

_check-node:
	@if ! command -v node > /dev/null 2>&1; then \
		printf "$(BOLD)$(RED)✖ Node.js not found. Install Node >= 18 from https://nodejs.org$(RESET)\n"; \
		exit 1; \
	fi

# ─── Help ─────────────────────────────────────────────────────────────────────

## help: Show available commands
help:
	@printf "$(BOLD)Yanca Web — available commands$(RESET)\n\n"
	@grep -E '^## [a-zA-Z_-]+:' $(MAKEFILE_LIST) \
		| sed 's/## //' \
		| awk -F': ' '{ printf "  $(BOLD)$(GREEN)make %-12s$(RESET) %s\n", $$1, $$2 }'
	@printf "\n"

.DEFAULT_GOAL := help

help:
	@perl -ne 'print if /^[0-9a-zA-Z_-]+:.*?## .*$$/' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}' 

build-deps: ## runs the project
	@cd server && npm ci && cd ../client && npm ci

run: build-deps ## runs the project
	@cd server && npm run dev & cd client && npm run start

.PHONY: run

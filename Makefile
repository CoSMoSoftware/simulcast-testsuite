
lint: src
	eslint src

build: src
	babel src --out-dir dist

test: build
	node dist/test

start: build
	node dist/lib/server

.PHONY: lint build

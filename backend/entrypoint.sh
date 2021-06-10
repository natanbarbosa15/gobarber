#!/bin/sh
yarn typeorm:production migration:run
node dist/shared/infra/http/server.js
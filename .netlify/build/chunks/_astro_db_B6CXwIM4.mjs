import { asDrizzleTable } from '@astrojs/db/runtime';
import { createClient } from '@astrojs/db/db-client/libsql-node.js';
import '@astrojs/db/dist/runtime/virtual.js';

const db = await createClient({
  url: "libsql://flavien-bonvin-flavienbonvin.turso.io",
  token: process.env.ASTRO_DB_APP_TOKEN ?? "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MzM1MTcyMjMsImlkIjoiMjIzYjk5NDgtNjkzYy00OWE5LWIzZjgtOWI0ODYyZDg3ZjhkIn0.3kEvkYNlwiLYTgxgDBVNvzaLiIsHgnkZ1XBFWldkgbC1SCA7uaJRG3HJLX8t8XT8CwVT75xI6pbwECnNq2CgDg"
});
const PageView = asDrizzleTable("PageView", { "columns": { "id": { "type": "number", "schema": { "unique": false, "deprecated": false, "name": "id", "collection": "PageView", "primaryKey": true } }, "pathname": { "type": "text", "schema": { "unique": true, "deprecated": false, "name": "pathname", "collection": "PageView", "primaryKey": false, "optional": false } }, "count": { "type": "number", "schema": { "unique": false, "deprecated": false, "name": "count", "collection": "PageView", "primaryKey": false, "optional": false, "default": 1 } } }, "deprecated": false, "indexes": {} }, false);
const SubscriptionValidation = asDrizzleTable("SubscriptionValidation", { "columns": { "id": { "type": "number", "schema": { "unique": false, "deprecated": false, "name": "id", "collection": "SubscriptionValidation", "primaryKey": true } }, "email": { "type": "text", "schema": { "unique": false, "deprecated": false, "name": "email", "collection": "SubscriptionValidation", "primaryKey": false, "optional": false } }, "token": { "type": "text", "schema": { "unique": false, "deprecated": false, "name": "token", "collection": "SubscriptionValidation", "primaryKey": false, "optional": false } }, "createdAt": { "type": "date", "schema": { "optional": false, "unique": false, "deprecated": false, "name": "createdAt", "collection": "SubscriptionValidation" } } }, "deprecated": false, "indexes": {} }, false);

export { PageView as P, SubscriptionValidation as S, db as d };

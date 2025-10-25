import { d as db, S as SubscriptionValidation } from './_astro_db_B6CXwIM4.mjs';
import { eq } from '@astrojs/db/dist/runtime/virtual.js';
import { A as AstroError, E as EnvInvalidVariables } from './astro/server_B0XwYhZu.mjs';

const isEmailAlreadySubscribed = async (email) => {
  const [subscription] = await db.select({ id: SubscriptionValidation.id }).from(SubscriptionValidation).where(eq(SubscriptionValidation.email, email));
  return !!subscription;
};
const createNewSubscription = async (email) => {
  const token = crypto.randomUUID().toString();
  await db.insert(SubscriptionValidation).values({
    email,
    token,
    createdAt: /* @__PURE__ */ new Date()
  });
  return token;
};
const getSubscriptionFromToken = async (token) => {
  const [subscription] = await db.select().from(SubscriptionValidation).where(eq(SubscriptionValidation.token, token));
  return subscription;
};
const deleteSubscription = async (token) => {
  await db.delete(SubscriptionValidation).where(eq(SubscriptionValidation.token, token));
};

const schema = {"BLOG_AUDIENCE_ID":{"context":"server","access":"secret","type":"string"},"RESEND_API_KEY":{"context":"server","access":"secret","type":"string"}};

function invalidVariablesToError(invalid) {
  const _errors = [];
  for (const { key, type, errors } of invalid) {
    if (errors[0] === "missing") {
      _errors.push(`${key} is missing`);
    } else if (errors[0] === "type") {
      _errors.push(`${key}'s type is invalid, expected: ${type}`);
    } else {
      _errors.push(`The following constraints for ${key} are not met: ${errors.join(", ")}`);
    }
  }
  return _errors;
}

function getEnvFieldType(options) {
  const optional = options.optional ? options.default !== void 0 ? false : true : false;
  let type;
  if (options.type === "enum") {
    type = options.values.map((v) => `'${v}'`).join(" | ");
  } else {
    type = options.type;
  }
  return `${type}${optional ? " | undefined" : ""}`;
}
const stringValidator = ({ max, min, length, url, includes, startsWith, endsWith }) => (input) => {
  if (typeof input !== "string") {
    return {
      ok: false,
      errors: ["type"]
    };
  }
  const errors = [];
  if (max !== void 0 && !(input.length <= max)) {
    errors.push("max");
  }
  if (min !== void 0 && !(input.length >= min)) {
    errors.push("min");
  }
  if (length !== void 0 && !(input.length === length)) {
    errors.push("length");
  }
  if (url !== void 0 && !URL.canParse(input)) {
    errors.push("url");
  }
  if (includes !== void 0 && !input.includes(includes)) {
    errors.push("includes");
  }
  if (startsWith !== void 0 && !input.startsWith(startsWith)) {
    errors.push("startsWith");
  }
  if (endsWith !== void 0 && !input.endsWith(endsWith)) {
    errors.push("endsWith");
  }
  if (errors.length > 0) {
    return {
      ok: false,
      errors
    };
  }
  return {
    ok: true,
    value: input
  };
};
const numberValidator = ({ gt, min, lt, max, int }) => (input) => {
  const num = parseFloat(input ?? "");
  if (isNaN(num)) {
    return {
      ok: false,
      errors: ["type"]
    };
  }
  const errors = [];
  if (gt !== void 0 && !(num > gt)) {
    errors.push("gt");
  }
  if (min !== void 0 && !(num >= min)) {
    errors.push("min");
  }
  if (lt !== void 0 && !(num < lt)) {
    errors.push("lt");
  }
  if (max !== void 0 && !(num <= max)) {
    errors.push("max");
  }
  if (int !== void 0) {
    const isInt = Number.isInteger(num);
    if (!(int ? isInt : !isInt)) {
      errors.push("int");
    }
  }
  if (errors.length > 0) {
    return {
      ok: false,
      errors
    };
  }
  return {
    ok: true,
    value: num
  };
};
const booleanValidator = (input) => {
  const bool = input === "true" ? true : input === "false" ? false : void 0;
  if (typeof bool !== "boolean") {
    return {
      ok: false,
      errors: ["type"]
    };
  }
  return {
    ok: true,
    value: bool
  };
};
const enumValidator = ({ values }) => (input) => {
  if (!(typeof input === "string" ? values.includes(input) : false)) {
    return {
      ok: false,
      errors: ["type"]
    };
  }
  return {
    ok: true,
    value: input
  };
};
function selectValidator(options) {
  switch (options.type) {
    case "string":
      return stringValidator(options);
    case "number":
      return numberValidator(options);
    case "boolean":
      return booleanValidator;
    case "enum":
      return enumValidator(options);
  }
}
function validateEnvVariable(value, options) {
  const isOptional = options.optional || options.default !== void 0;
  if (isOptional && value === void 0) {
    return {
      ok: true,
      value: options.default
    };
  }
  if (!isOptional && value === void 0) {
    return {
      ok: false,
      errors: ["missing"]
    };
  }
  return selectValidator(options)(value);
}

function createInvalidVariablesError(key, type, result) {
  return new AstroError({
    ...EnvInvalidVariables,
    message: EnvInvalidVariables.message(
      invalidVariablesToError([{ key, type, errors: result.errors }])
    )
  });
}

/* eslint-disable @typescript-eslint/no-unused-vars */
// @ts-check

// @ts-expect-error
/** @returns {string} */
// used while generating the virtual module
// biome-ignore lint/correctness/noUnusedFunctionParameters: `key` is used by the generated code
const getEnv = (key) => {
	return ({"ASTRO_DB_APP_TOKEN":"eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MzM1MTcyMjMsImlkIjoiMjIzYjk5NDgtNjkzYy00OWE5LWIzZjgtOWI0ODYyZDg3ZjhkIn0.3kEvkYNlwiLYTgxgDBVNvzaLiIsHgnkZ1XBFWldkgbC1SCA7uaJRG3HJLX8t8XT8CwVT75xI6pbwECnNq2CgDg","ASTRO_DB_REMOTE_URL":"libsql://flavien-bonvin-flavienbonvin.turso.io","BLOG_AUDIENCE_ID":"a6a65cd3-d2f2-4339-9718-c2913b3126ce","RESEND_API_KEY":"re_Ma4XNyQf_8g471JURLQKydVuri7ESJ9hT","VERCEL_OIDC_TOKEN":"eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Im1yay00MzAyZWMxYjY3MGY0OGE5OGFkNjFkYWRlNGEyM2JlNyJ9.eyJpc3MiOiJodHRwczovL29pZGMudmVyY2VsLmNvbS9mbGF2aWVuLWJvbnZpbi1zLXRlYW0iLCJzdWIiOiJvd25lcjpmbGF2aWVuLWJvbnZpbi1zLXRlYW06cHJvamVjdDpmbGF2aWVuLWJvbnZpbjplbnZpcm9ubWVudDpkZXZlbG9wbWVudCIsInNjb3BlIjoib3duZXI6Zmxhdmllbi1ib252aW4tcy10ZWFtOnByb2plY3Q6Zmxhdmllbi1ib252aW46ZW52aXJvbm1lbnQ6ZGV2ZWxvcG1lbnQiLCJhdWQiOiJodHRwczovL3ZlcmNlbC5jb20vZmxhdmllbi1ib252aW4tcy10ZWFtIiwib3duZXIiOiJmbGF2aWVuLWJvbnZpbi1zLXRlYW0iLCJvd25lcl9pZCI6InRlYW1fT0VtQUpTNGpZeHJndkdoa3lHR0Y1YzREIiwicHJvamVjdCI6ImZsYXZpZW4tYm9udmluIiwicHJvamVjdF9pZCI6InByal9Cc2JCdFR6dW9OSzJ5Y1dHRHpnbGJYZHgxaVZQIiwiZW52aXJvbm1lbnQiOiJkZXZlbG9wbWVudCIsInVzZXJfaWQiOiJuQXpLRVJISk9FeFZlamEzbTdYemxJNEwiLCJuYmYiOjE3NTkzNDIzMDAsImlhdCI6MTc1OTM0MjMwMCwiZXhwIjoxNzU5Mzg1NTAwfQ.Tx6mMt_4CVTm3AePA4txQiBlLj4XY6GPP7VhGQfTVtzc-JUJLiqcbzLoDmA87gjp4M6HU_CudMgvSgfEQQO_qR9LEiNT37mnBEaQTCWO0pfSqgXn6wet0Lt4LU7URKH0Xq24Pb2tXSc8hMka_io6ZF6z--RWi_3Cwad0Ngwx8nWgyT2zJGBVe96Go_RMHiVoX75hJ-fzNSaJNJFx8zHp1b6u7H3QtwsbXdzwtstAs6uz5xKeHeedKZRaP3UC5Z9yhhUE9yOwndgVEVCwd3fHdIUwLWCNnXEXFv2A4MDRFss7vtdTr3m5Fg3BbYdeZOXsEKAe95fNbUCMG8GJdHkAOw","SHELL":"/opt/homebrew/bin/fish","npm_command":"run-script","WINDOWID":"4294967333","COLORTERM":"truecolor","XPC_FLAGS":"0x0","TERM_PROGRAM_VERSION":"0.209.6","NODE":"/Users/fbonvin/.local/share/nvm/v22.21.0/bin/node","__CFBundleIdentifier":"dev.zed.Zed","SSH_AUTH_SOCK":"/private/tmp/com.apple.launchd.AZ9D7REj8s/Listeners","NODE_EXTRA_CA_CERTS":"/Users/fbonvin/Library/Application Support/mkcert/rootCA.pem","OSLogRateLimit":"64","npm_config_local_prefix":"/Users/fbonvin/Developer/flavien-bonvin","PWD":"/Users/fbonvin/Developer/flavien-bonvin","LOGNAME":"fbonvin","nvm_current_version":"v22.21.0","COMMAND_MODE":"unix2003","HOME":"/Users/fbonvin","LANG":"en_US.UTF-8","STARSHIP_SHELL":"fish","TMPDIR":"/var/folders/16/r95x28ld059184gwgkljvq2c0000gn/T/","STARSHIP_SESSION_KEY":"2037931402967369","npm_lifecycle_script":"astro check && astro build --remote","TERM":"xterm-256color","npm_package_name":"flavien-bonvin","USER":"fbonvin","npm_lifecycle_event":"build","SHLVL":"3","PAGER":"","XPC_SERVICE_NAME":"0","npm_config_user_agent":"bun/1.3.1 npm/? node/v24.3.0 darwin arm64","npm_execpath":"/Users/fbonvin/.bun/bin/bun","LC_CTYPE":"en_US.UTF-8","npm_package_json":"/Users/fbonvin/Developer/flavien-bonvin/package.json","BUN_INSTALL":"/Users/fbonvin/.bun","ZED_ENVIRONMENT":"worktree-shell","PATH":"/Users/fbonvin/Developer/flavien-bonvin/node_modules/.bin:/Users/fbonvin/Developer/flavien-bonvin/node_modules/.bin:/Users/fbonvin/Developer/node_modules/.bin:/Users/fbonvin/node_modules/.bin:/Users/node_modules/.bin:/node_modules/.bin:/Users/fbonvin/.bun/bin:/opt/homebrew/bin:/Applications/Ghostty.app/Contents/MacOS:/usr/local/bin:/System/Cryptexes/App/usr/bin:/usr/bin:/bin:/usr/sbin:/sbin:/var/run/com.apple.security.cryptexd/codex.system/bootstrap/usr/local/bin:/var/run/com.apple.security.cryptexd/codex.system/bootstrap/usr/bin:/var/run/com.apple.security.cryptexd/codex.system/bootstrap/usr/appleinternal/bin:/Library/Apple/usr/bin:/Users/fbonvin/.bun/bin:/Users/fbonvin/.cargo/bin:/Users/fbonvin/.local/share/nvm/v22.21.0/bin","ALACRITTY_WINDOW_ID":"4294967333","ZED_TERM":"true","npm_node_execpath":"/Users/fbonvin/.local/share/nvm/v22.21.0/bin/node","__CF_USER_TEXT_ENCODING":"0x1F5:0x0:0x0","TERM_PROGRAM":"zed","_":"/Users/fbonvin/Developer/flavien-bonvin/node_modules/.bin/astro","NODE_ENV":"production"})[key];
};

const _internalGetSecret = (key) => {
	const rawVariable = getEnv(key);
	const variable = rawVariable === '' ? undefined : rawVariable;
	const options = schema[key];

	const result = validateEnvVariable(variable, options);
	if (result.ok) {
		return result.value;
	}
	const type = getEnvFieldType(options);
	throw createInvalidVariablesError(key, type, result);
};
let BLOG_AUDIENCE_ID = _internalGetSecret("BLOG_AUDIENCE_ID");
let RESEND_API_KEY = _internalGetSecret("RESEND_API_KEY");

export { BLOG_AUDIENCE_ID as B, RESEND_API_KEY as R, createNewSubscription as c, deleteSubscription as d, getSubscriptionFromToken as g, isEmailAlreadySubscribed as i };

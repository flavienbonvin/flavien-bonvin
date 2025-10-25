import { getDeployStore, getStore } from '@netlify/blobs';
import { fetch } from 'ofetch';

function defineDriver(factory) {
  return factory;
}
function createError(driver, message, opts) {
  const err = new Error(`[unstorage] [${driver}] ${message}`, opts);
  if (Error.captureStackTrace) {
    Error.captureStackTrace(err, createError);
  }
  return err;
}
function createRequiredError(driver, name) {
  if (Array.isArray(name)) {
    return createError(
      driver,
      `Missing some of the required options ${name.map((n) => "`" + n + "`").join(", ")}`
    );
  }
  return createError(driver, `Missing required option \`${name}\`.`);
}

const DRIVER_NAME = "netlify-blobs";
const netlifyBlobs = defineDriver((options) => {
  const { deployScoped, name, ...opts } = options;
  let store;
  const getClient = () => {
    if (!store) {
      if (deployScoped) {
        if (name) {
          throw createError(
            DRIVER_NAME,
            "deploy-scoped stores cannot have a name"
          );
        }
        store = getDeployStore({ fetch, ...options });
      } else {
        if (!name) {
          throw createRequiredError(DRIVER_NAME, "name");
        }
        store = getStore({ name: encodeURIComponent(name), fetch, ...opts });
      }
    }
    return store;
  };
  return {
    name: DRIVER_NAME,
    options,
    getInstance: getClient,
    async hasItem(key) {
      return getClient().getMetadata(key).then(Boolean);
    },
    getItem: (key, tops) => {
      return getClient().get(key, tops);
    },
    getMeta(key) {
      return getClient().getMetadata(key);
    },
    getItemRaw(key, topts) {
      return getClient().get(key, { type: topts?.type ?? "arrayBuffer" });
    },
    async setItem(key, value, topts) {
      await getClient().set(key, value, topts);
    },
    async setItemRaw(key, value, topts) {
      await getClient().set(key, value, topts);
    },
    removeItem(key) {
      return getClient().delete(key);
    },
    async getKeys(base, tops) {
      return (await getClient().list({ ...tops, prefix: base })).blobs.map(
        (item) => item.key
      );
    },
    async clear(base) {
      const client = getClient();
      return Promise.allSettled(
        (await client.list({ prefix: base })).blobs.map(
          (item) => client.delete(item.key)
        )
      ).then(() => {
      });
    }
  };
});

export { netlifyBlobs as default };

const { promisify } = require("util");
const expressRedisCache = require("express-redis-cache");

class Cache {
  constructor(host, port, authPass) {
    this.cache = expressRedisCache({host, port, auth_pass:authPass})
  }

  async readFromCache(key) {
    try {
      const cacheGet = promisify(this.cache.get).bind(this.cache);
      const data = await cacheGet(key);
      return (data && data !== {} && data !== '' && data !== null) ? JSON.parse(data[0].body) : undefined;
    } catch (error) {
      throw error;
    }
  }
  async writeToCache(key, value) {
    try {
      const cacheAdd = promisify(this.cache.add).bind(this.cache);
      return cacheAdd(key, JSON.stringify(value), {
        type: "json"
      });
    } catch (error) {
      throw error;
    }
  }
  async deleteFromCache(key) {
    try {
      const cacheDel = promisify(this.cache.del).bind(this.cache);
      return cacheDel(key);
    } catch (error) {
      throw error;
    }
  }
}
module.exports = Cache;
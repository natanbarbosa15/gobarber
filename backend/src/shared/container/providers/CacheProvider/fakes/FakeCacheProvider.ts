import ICacheProvider from '../models/ICacheProvider';

interface ICacheData {
  [key: string]: string;
}

export default class FakeCacheProvider implements ICacheProvider {
  private cache: ICacheData = {};

  public async save(key: string, value: any): Promise<void> {
    return new Promise<void>((resolve) => {
      this.cache[key] = JSON.stringify(value);

      resolve();
    });
  }

  public async recover<T>(key: string): Promise<T | undefined> {
    return new Promise((resolve) => {
      const data = this.cache[key];

      if (!data) resolve(undefined);

      const parsedData = JSON.parse(data) as T;

      resolve(parsedData);
    });
  }

  public async invalidate(key: string): Promise<void> {
    return new Promise((resolve) => {
      delete this.cache[key];

      resolve();
    });
  }

  public async invalidatePrefix(prefix: string): Promise<void> {
    return new Promise((resolve) => {
      const keys = Object.keys(this.cache).filter((key) =>
        key.startsWith(`${prefix}:`),
      );

      keys.forEach((key) => {
        delete this.cache[key];
      });

      resolve();
    });
  }
}

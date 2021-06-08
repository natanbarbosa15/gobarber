import IStorageProvider from '../models/IStorageProvider';

class FakeStorageProvider implements IStorageProvider {
  private storage: string[] = [];

  public async saveFile(file: string): Promise<string> {
    return new Promise((resolve) => {
      this.storage.push(file);

      resolve(file);
    });
  }

  public async deleteFile(file: string): Promise<void> {
    return new Promise((resolve) => {
      const findIndex = this.storage.findIndex(
        (storageFile) => storageFile === file,
      );

      this.storage.splice(findIndex, 1);

      resolve();
    });
  }
}

export default FakeStorageProvider;

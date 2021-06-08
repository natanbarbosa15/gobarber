import IMailTemplateProvider from '../models/IMailTemplateProvider';

class FakeMailTemplateProvider implements IMailTemplateProvider {
  public async parse(): Promise<string> {
    return new Promise((resolve) => {
      resolve('Mail content');
    });
  }
}

export default FakeMailTemplateProvider;

import { container } from 'tsyringe';

import IMailProvider from './models/IMailProvider';
import EtheralMailProvider from './implementations/EtheralMailProvider';

container.registerInstance<IMailProvider>(
  'MailProvider',
  container.resolve(EtheralMailProvider),
);

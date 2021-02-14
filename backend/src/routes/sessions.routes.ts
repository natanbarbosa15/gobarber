import { Router } from 'express';

import AuthenticateUserService from '../services/AuthenticateUserService';

const usersRouter = Router();

usersRouter.post('/', async (req, res) => {
  const { email, password } = req.body;

  const authenticateUserService = new AuthenticateUserService();

  const user = await authenticateUserService.execute({ email, password });

  return res.json(user);
});

export default usersRouter;

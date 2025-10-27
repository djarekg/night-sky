import { createContext } from 'react-router';
import { type AuthModel } from './auth.model.js';

export const authContext = createContext<AuthModel>({
  userId: null,
  username: null,
  isAuthenticated: false,
});

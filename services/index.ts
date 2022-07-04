import { Context } from '@nuxt/types'

import { SessionService } from "./session";
import { UserService } from "./user";

export const initializeService = (context: Context) => ({
  session: new SessionService(context),
  user: new UserService(context),
});

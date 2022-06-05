import { Context } from '@nuxt/types'

import { MailService } from "./mail";
import { SessionService } from "./session";
import { TokenService } from "./token";
import { UserService } from "./user";

export const initializeService = (context: Context) => ({
  mail: new MailService(context),
  session: new SessionService(context),
  token: new TokenService(context),
  user: new UserService(context),
});

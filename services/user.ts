import { Context } from '@nuxt/types'
import BaseService from "./base.service";

import { UserType } from '@/interfaces';
import { UserRepository } from "@/repository"

class UserService extends BaseService<UserType> {
  static storeName: string = "user";

  constructor(context: Context) {
    super(context, new UserRepository(context), UserService.storeName)
  }

  async findByEmail(email: string) {
    return await this.findOne({ email });
  }

  filtered({ term }: any, _page: number, _count: number) {
    return this.store.state.user.users.filter((x: UserType) =>
      (term ? x.name ? x.name.toLowerCase().includes(term.toLowerCase()) : false : true) ||
      (term ? x.username ? x.username.toLowerCase().includes(term.toLowerCase()) : false : true)
    );
  }
}

export { UserService }
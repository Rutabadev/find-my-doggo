import { Module, VuexModule, Mutation } from 'vuex-module-decorators'
import { User } from '~/types'

@Module({
  name: 'auth',
  stateFactory: true,
  namespaced: true,
})
// eslint-disable-next-line no-unused-vars
export default class AuthModule extends VuexModule {
  user: User | null = null

  @Mutation
  setUser(user: User) {
    this.user = user
  }

  @Mutation
  logout() {
    this.user = null
  }
}

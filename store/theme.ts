import { Module, VuexModule, Mutation } from 'vuex-module-decorators'

@Module({
  name: 'theme',
  stateFactory: true,
  namespaced: true,
})
export default class Theme extends VuexModule {
  darkMode = false

  @Mutation
  setDarkMode(darkMode: boolean) {
    this.darkMode = darkMode
  }
}

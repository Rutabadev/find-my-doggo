import { Module, VuexModule, Mutation } from 'vuex-module-decorators'

@Module({
  name: 'snackbar',
  stateFactory: true,
  namespaced: true,
})
export default class SnackbarModule extends VuexModule {
  content = ''

  @Mutation
  showMessage(content: string) {
    this.content = content
  }
}

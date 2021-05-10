import { Module, VuexModule, Mutation } from 'vuex-module-decorators'

@Module({
  name: 'sidebar',
  stateFactory: true,
  namespaced: true,
})
export default class SidebarModule extends VuexModule {
  open = false

  @Mutation
  setOpen(value: boolean) {
    this.open = value
  }
}

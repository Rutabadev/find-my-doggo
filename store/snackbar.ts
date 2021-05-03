import { Module, VuexModule, Mutation } from 'vuex-module-decorators'

interface Notification {
  message: string
  duration?: number
}

@Module({
  name: 'snackbar',
  stateFactory: true,
  namespaced: true,
})
export default class SnackbarModule extends VuexModule {
  notification: Notification = { message: '', duration: 0 }

  @Mutation
  showMessage(notification: Notification) {
    this.notification = {
      ...notification,
      duration: notification.duration ?? 3000,
    }
  }
}

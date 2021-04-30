import { Store } from 'vuex'
import { getModule } from 'vuex-module-decorators'
import snackbar from '~/store/snackbar'

let snackbarStore: snackbar

function initialiseStores(store: Store<any>): void {
  snackbarStore = getModule(snackbar, store)
}

export { initialiseStores, snackbarStore }

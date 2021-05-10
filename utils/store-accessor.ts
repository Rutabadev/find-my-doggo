import { Store } from 'vuex'
import { getModule } from 'vuex-module-decorators'
import snackbar from '~/store/snackbar'
import sidebar from '~/store/sidebar'

let snackbarStore: snackbar
let sidebarStore: sidebar

function initialiseStores(store: Store<any>): void {
  snackbarStore = getModule(snackbar, store)
  sidebarStore = getModule(sidebar, store)
}

export { initialiseStores, snackbarStore, sidebarStore }

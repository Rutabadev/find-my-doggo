import { Store } from 'vuex'
import { getModule } from 'vuex-module-decorators'
import theme from '~/store/theme'

// eslint-disable-next-line import/no-mutable-exports
let themeStore: theme

function initialiseStores(store: Store<any>): void {
  themeStore = getModule(theme, store)
}

export { initialiseStores, themeStore }

import store from './store'
import { getSession, setSession } from './actions'

window.store = store
window.getSession = getSession()
window.setSession = setSession()
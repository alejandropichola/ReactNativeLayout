import { createStore } from 'redux/index'
import rootReducer from '../reducers'

const store = createStore(rootReducer)

export default store
import { createStore } from 'redux'
import loginApp from '../reducer'

export const store = createStore(loginApp)
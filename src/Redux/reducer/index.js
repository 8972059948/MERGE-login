import { combineReducers } from 'redux';
import { SAVE_USER_INFO, ACCESS_TOKEN } from '../action';


const userLoginInfo = (state = [], action) => {
    switch (action.type) {
      case SAVE_USER_INFO:
        return [
          ...state,
          {
            userEmail: action.userEmail,
            userPassword: action.userPassword,
          },
        ]
      case ACCESS_TOKEN:
        return [
          ...state,
          {
            accessToken: action.accessToken,
          },
        ]
      default:
        return state
    }
}

const loginApp = combineReducers({
  userLoginInfo
})
  
export default loginApp;
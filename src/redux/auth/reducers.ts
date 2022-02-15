
import {userConstants} from './types';
   
    export function authentication(state = [], action) {
      switch (action.type) {
        case userConstants.LOGIN_REQUEST:
          return {
            loggingIn: true,
            user: action.user
          };
        case userConstants.LOGIN_SUCCESS:
          return {
            loggedIn: true,
            user: action.user
          };
        case userConstants.LOGIN_FAILURE:
          return {};
        case userConstants.LOGOUT:
          return {};
        default:
          return state
      }
    }

    export function registration(state = [], action) {
      console.log(state,"state")
        switch (action.type) {
          case userConstants.REGISTER_REQUEST:
         
            return { ...state, ...action.payload };


          case userConstants.REGISTER_SUCCESS:
            const id = getNewId(state);
           
         return   [ {...action.payload,id} , ...state]
            // return { ...state, ...action.payload };
            // return { ...state, registering: false }


          case userConstants.REGISTER_FAILURE:
            return { ...state, registering: false }
          default:
            return state
        }
      }
function getNewId(patients) {
    return patients
      .map((patient) => patient.id)
      .map((id) => parseInt(id))
      .reduce((largest, id) => Math.max(largest, id + 1), -1)
      .toString();
  }
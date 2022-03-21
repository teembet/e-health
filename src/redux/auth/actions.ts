import {userConstants} from './types';
import axios from 'axios';
import { alertActions } from '../alert/action';



  

  
export function login(payload) {
    // return the promise using fetch which adds to localstorage on resolve
    const user = payload

    function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }

    return async function dispatch(dispatch) {
        dispatch(request(user));
        try {
           
            
            dispatch(alertActions.success("working"))
        
            // const res = await userService.login(username, password);
            dispatch(success(user));
        } catch (err) {
            console.log(err);
            dispatch(alertActions.error(err))
            dispatch(failure(err));
        }
    }
}
  

export function register(user:any) {
    // return the promise using fetch which dispatches appropriately 
    function request(user) { return { type: userConstants.REGISTER_REQUEST, payload:user } }
    function success(user) { return { type: userConstants.REGISTER_SUCCESS, payload:user } }
    function failure(error) { return { type: userConstants.REGISTER_FAILURE, error } }

    return async function dispatch(dispatch) {
        // dispatch(request(user));
        try {


           

            // const res = await userService.register(user);
            dispatch(success(user));
       
            // dispatch(alertActions.success("Registration successful"))
        } catch (err) {
            // console.log(err);
            // dispatch(alertActions.error(err))
            // dispatch(failure(err));
        }
    }

}

export const createUser=payload=>{
   
    return{
        type:userConstants.USER_SAVE,
        payload
    }
}


const  logout=()=> {
    // complete this function
    // userService.logout()
    return {
        type: userConstants.LOGOUT
    }
}
  
//   export const editPatient = (patient: IPatient): EditPatientAction => ({
//     type: EDIT_PATIENT,
//     payload: patient
//   });
  
//   export const fetchPatients = (url: string) => {
//     return dispatch => {
//       axios
//         .get<IPatient[]>(url)
//         .then(res => res.data)
//         .then(data => {
//           dispatch(setPatients(data));
//         })
//         .catch(err => console.error('Server connections error'));
//     };
  
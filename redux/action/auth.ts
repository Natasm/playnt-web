import { Dispatch } from "redux";
import { setLoadingGlobal, setToken } from "../actions";
import store from "../store";

import { login as loginRequest }from "../../services/auth"

export const authLogin = (email: string, password: string) => {
    return async function (dispatch: Dispatch) {
        try {
            dispatch(setLoadingGlobal(true))

            const response = await loginRequest(email, password);

            if (response?.data?.auth) {
                dispatch(setToken(email))
            }

        } catch (e) { console.log(e) }
        finally { 
            dispatch(setLoadingGlobal(false)) 
        }
    }
}
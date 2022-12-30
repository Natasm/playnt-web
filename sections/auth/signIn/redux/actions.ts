import { setCookie } from "cookies-next"
import { signIn } from "next-auth/react"
import { Dispatch } from "redux"
import { setLoadingReducer } from "../../../../redux/actions"
import { login as loginService } from "../../../../services/auth"

export const loginAction = (login: string, password: string) => {
    return async function (dispatch: Dispatch) {
        try {
            
            dispatch(setLoadingReducer(true))

            const response = await loginService(login, password)

            if (response?.data?.token && response?.data?.customerId) {

                setCookie('user-token', response.data.token)

                await signIn('signIn', {
                    login,
                    callbackUrl: '/home'
                })
            }

        } catch (e) {
            console.log(e)
        }
        finally {
            dispatch(setLoadingReducer(false))
        }
    }
}
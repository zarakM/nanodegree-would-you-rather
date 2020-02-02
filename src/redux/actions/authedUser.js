export const LOGIN_USER = 'LOGIN_USER';
export const LOGOUT_USER = 'LOGOUT_USER'

export function setAuthedUser(id){
  return {
    type: LOGIN_USER,
    id
  }
}

export function unsetAuthedUser () {
  return {
    type: LOGOUT_USER
  }
}
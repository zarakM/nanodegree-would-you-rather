export const RECEIVE_USERS = 'RECEIVE_USERS';
export const ADD_USER_POLL = 'ADD_USER_POLL';
export const USER_ANSWER_POLL = 'USER_ANSWER_POLL';

export function receiveUsers(users){
    return{
        type: RECEIVE_USERS,
        users
    }
}

export function addUserQuestion (authedUser, qid) {
    return {
      type: ADD_USER_POLL,
      authedUser,
      qid
    }
  }

export function saveUserAnswer (auth, qid, option) {
  return {
    type: USER_ANSWER_POLL,
    auth,
    qid,
    option
  }
}
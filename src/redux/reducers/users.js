import { RECEIVE_USERS, USER_ANSWER_POLL, ADD_USER_POLL } from '../actions/users'

export default function users (state= {}, action){
  switch(action.type){
    case USER_ANSWER_POLL:
      return {
        ...state,
        [action.auth]: {
          ...state[action.auth],
          answers: {
            ...state[action.auth].answers,
            [action.qid]: action.option
          }
        }
      };
    case RECEIVE_USERS:
      return {
        ...state,
        ...action.users
      };
    case ADD_USER_POLL :
      return {
        ...state,
        [action.authedUser]: {
          ...state[action.authedUser],
          questions: state[action.authedUser].questions.concat([action.qid])
        }
      };
    default:
      return state
  }
}
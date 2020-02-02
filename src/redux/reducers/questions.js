import {
  RECEIVE_POLLS,
  ADD_POLL,
  SAVE_POLLS_ANSWER
} from "../actions/questions";

export default function questions(state = {}, action) {
  switch (action.type) {
    case RECEIVE_POLLS:
      return {
        ...state,
        ...action.questions
      };
    case ADD_POLL:
      return {
        ...state,
        [action.question.id]: action.question
      };
    case SAVE_POLLS_ANSWER:
      return {
        ...state,
        [action.qid]: {
          ...state[action.qid],
          [action.answer]: {
            ...state[action.qid][action.answer],
            votes: state[action.qid][action.answer].votes.concat([
              action.authedUser
            ])
          }
        }
      };
    default:
      return state;
  }
}

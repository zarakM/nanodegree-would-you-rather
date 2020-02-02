export const RECEIVE_POLLS = 'RECEIVE_POLLS';
export const ADD_POLL = 'ADD_POLL';
export const SAVE_POLLS_ANSWER = 'SAVE_POLLS_ANSWER';

export function addQuestion (question) {
  return {
    type: ADD_POLL,
    question
  }
}

export function receiveQuestions(questions){
  return{
    type: RECEIVE_POLLS,
    questions
  }
}

export function saveQuestionAnswer(authedUser, qid, answer) {
  return {
    type: SAVE_POLLS_ANSWER,
    authedUser,
    qid,
    answer
  }
}
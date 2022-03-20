const initialState = {

  auto_connect: false,
  loaded: false,

  status: undefined,
  entry_id: undefined,
  host: undefined,
  port: undefined,
  que: undefined,

  seconds_to_kill: undefined,
  seconds_to_start: undefined,

};


const KEY = {
  UPDATE: 'UPDATE',
}


function reducer(state, action) {
  const { type, payload: anValue } = action;
  // console.log(state);

  if (type === KEY.UPDATE) {
    return { ...state, ...anValue };
  }

  return state;
}


export default {
  initialState,
  KEY,
  reducer,
}

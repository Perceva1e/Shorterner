const initialState = {
  loading: false,
  error: null,
  result: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'SHORTEN_URL_REQUEST':
      return { ...state, loading: true, error: null };
    case 'SHORTEN_URL_SUCCESS':
      return { ...state, loading: false, result: action.payload };
    case 'SHORTEN_URL_FAILURE':
      return { ...state, loading: false, error: action.payload };
    case 'RESET_URL_STATE':
      return initialState;
    default:
      return state;
  }
};
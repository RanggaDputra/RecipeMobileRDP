// reducers/searchReducer.js

const initialState = {
    loading: false,
    results: [],
    error: null,
  };
  
  const searchReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SEARCH_MENU_REQUEST':
        return { ...state, loading: true, error: null };
      case 'SEARCH_MENU_SUCCESS':
        return { ...state, loading: false, results: action.payload, error: null };
      case 'SEARCH_MENU_FAILURE':
        return { ...state, loading: false, results: [], error: action.payload };
      default:
        return state;
    }
  };
  
  export default searchReducer;
  
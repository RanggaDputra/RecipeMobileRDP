const initialState = {
    data: null,
    errorMessage: '',
    isLoading: false,
    isError: false,
  };
  
  const putMenu = (state = initialState, action) => {
    switch (action.type) {
      case 'PUT_MENU_PENDING':
        return {
          ...state,
          isLoading: true,
        };
      case 'PUT_MENU_SUCCESS':
        return {
          ...state,
          data: action.payload,
          isLoading: false,
          errorMessage: '',
          isError: false,
        };
      case 'PUT_MENU_FAILED':
        return {
          ...state,
          data: null,
          errorMessage: action.payload,
          isLoading: false,
          isError: true,
        };
      default:
        return state;
    }
  };
  
  export default putMenu;
  
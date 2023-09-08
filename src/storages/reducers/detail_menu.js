const initialState = {
    data: null,
    errorMessage: '',
    isLoading: false,
    isError: false,
  };
  
  const detailMenu = (state = initialState, action) => {
    switch (action.type) {
      case 'DETAIL_MENU_PENDING':
        return {
          ...state,
          isLoading: true,
        };
      case 'DETAIL_MENU_SUCCESS':
        return {
          ...state,
          data: action.payload,
          isLoading: false,
          errorMessage: '',
          isError: false,
        };
      case 'DETAIL_MENU_FAILED':
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
  
  export default detailMenu;
  
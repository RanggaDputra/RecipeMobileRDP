const initialState = {
    data: null,
    isLoading: false,
    isError: false,
    isSuccess: true,
    errorMessage: ''
}

const menu = (state = initialState, { action,type, payload }) => {
    switch (type) {
        case "GET_MENU_REQUEST":
            return {
                ...state,
                isLoading: true,
                isError: false,
                isSuccess: false,
            }
        case "GET_MENU_SUCCESS":
            return {
                ...state,
                isLoading: false,
                isError: false,
                isSuccess: true,
                data: action.payload
            }
        case "GET_MENU_ERROR":
            return {
                ...state,
                isLoading: false,
                isError: true,
                isSuccess: false,
                errorMessage: payload.errorMessage
            }
        case "CLEAR_MENU":
            return {
                ...state,
                data: null,
                isLoading: false,
                isError: false,
                isSuccess: true,
            }
        default:
            return state
    }
}

export default menu;

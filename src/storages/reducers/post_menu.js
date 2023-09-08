const initialState = {
    menuData: null,
    isLoading: false,
    isError: false,
    isSuccess: true,
    errorMessage: ''
}

const postMenu = (state = initialState, { type, payload }) => {
    switch (type) {
        case "POST_MENU_REQUEST":
            return {
                ...state,
                isLoading: true,
                isError: false,
                isSuccess: false,
            }
        case "POST_MENU_SUCCESS":
            return {
                ...state,
                isLoading: false,
                isError: false,
                isSuccess: true,
                menuData: payload.menuData
            }
        case "POST_MENU_ERROR":
            return {
                ...state,
                isLoading: false,
                isError: true,
                isSuccess: false,
                errorMessage: payload.errorMessage
            }
        case "CLEAR_POST_MENU":
            return {
                ...state,
                menuData: null,
                isLoading: false,
                isError: false,
                isSuccess: true,
            }
        default:
            return state
    }
}

export default postMenu;

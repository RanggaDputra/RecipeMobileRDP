import { combineReducers } from "redux";

import login from './login'
import postMenu from "./post_menu";
import menu from "./menu";
import putMenu from "./put_menu";
import detailMenu from "./detail_menu";
import searchReducer from "./search";

const appReducers = combineReducers({
    login:login,
    postMenu,
    menu,
    putMenu,
    detailMenu,
    search: searchReducer,
})

export default appReducers;
import { combineReducers } from "redux";

import login from './login'
import postMenu from "./post_menu";
import menu from "./menu";
import putMenu from "./put_menu";
import detailMenu from "./detail_menu";
import searchReducer from "./search";
import getMenuByUser from './getMenubyUser';
import putProfile from './put_profile';
import getMenuReducers from './getMenuReducers';
import register from './register';

const appReducers = combineReducers({
    login:login,
    postMenu,
    menu,
    register,
    getMenuReducers,
    putProfile,
    putMenu,
    getMenuByUser,
    detailMenu,
    search: searchReducer,
})

export default appReducers;
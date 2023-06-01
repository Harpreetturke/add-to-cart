//jine b reducer hoge ithe add kraga una nu
import { combineReducers } from "redux";
import { cartreducer } from "./reducer";

const rootred=combineReducers({
    cartreducer
});

export default rootred;
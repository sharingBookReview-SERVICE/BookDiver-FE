import React,{useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import { actionCreators as userActions } from "../../redux/modules/user";

const Bookmark = (props) =>{
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(userActions.getBookmarkSV());
    },[])
    return(
        <React.Fragment></React.Fragment>
    )
}

export default Bookmark;
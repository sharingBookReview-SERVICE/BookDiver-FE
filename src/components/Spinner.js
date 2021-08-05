import React, { useState, useEffect } from "react";
import { css } from "@emotion/react";
import PacmanLoader from "react-spinners/PacmanLoader";
import styled from "styled-components";


import { useDispatch } from "react-redux";
import { actionCreators as permitActions } from "../redux/modules/permit";
import { actionCreators as userActions } from "../redux/modules/user";
import { history } from "../redux/configStore";
import { setCookie,setLocal } from "../shared/Cookie";
import jwt_decode from "jwt-decode";



// Can be a string as well. Need to ensure each key-value pair ends with ;
const override = css`
  top:45%;
  left:41%;
`;

const Spinner = () => {
  const dispatch = useDispatch();
  let [loading, setLoading] = useState(true);


  useEffect(() => {
    dispatch(permitActions.showNav(false));
 
    const token = new URL(window.location.href).pathname.split("=")[1];
    
    setLocal("token", token);
  
    const decoded = jwt_decode(token);
    console.log(decoded)

    if(decoded.nickname){
      dispatch(userActions.setUserSV(decoded.userId, decoded.nickname));
      history.push('/')
    }
    else{
      history.push('/changename')
    }
   
  },[])

  
  return (
      <React.Fragment>    
        <SpinnerWrapper>
            {/* <PacmanLoader color={"#6cd4b8"} loading={loading} css={override} size={35}  /> */}
      </SpinnerWrapper>
    </React.Fragment>
  );
}

const SpinnerWrapper = styled.div`
width:100vw;
height:100vh;
box-sizing:border-box;
position:relative;
`

export default Spinner;
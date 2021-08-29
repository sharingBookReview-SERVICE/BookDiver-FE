import React, { useEffect } from "react";
import styled from "styled-components";


import { useDispatch } from "react-redux";
import { actionCreators as permitActions } from "../redux/modules/permit";
import { history } from "../redux/configStore";
import { setLocal } from "../shared/Cookie";
import jwt_decode from "jwt-decode";



const LoginCheck = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(permitActions.showNav(false));
 
    const token = new URL(window.location.href).pathname.split("=")[1];
    setLocal("token", token);
    const decoded = jwt_decode(token);


    if(decoded.nickname){
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

export default LoginCheck;
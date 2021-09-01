//import 부분
import React, { useState } from "react";
import styled from "styled-components";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import SearchIcon from '@material-ui/icons/Search';
import { makeStyles } from "@material-ui/core/styles";

import { useDispatch, useSelector } from "react-redux";
import { actionCreators as permitActions } from "../redux/modules/permit";
import { actionCreators as uploadAcions } from "../redux/modules/upload";
import {SearchLottie} from "../elements"
import Color from "../shared/Color"


import { CommonContainer, CommonOverlay } from "../shared/styles/modal/CommonModal";

const useStyles = makeStyles((theme) => ({
  expand: {
    position: "absolute",
    top:"12px",
    right:"8px",
    cursor:"pointer",
  },
  search: {
    color:Color.myFeedMainFont,
    cursor:"pointer",
  },
  arrow:{
    cursor:"pointer",
  }
}));


const UnsplashModal = (props) =>{
  const dispatch = useDispatch();
  const classes = useStyles()

  const [searchWord, setSearchWord] = useState("");
  const imageList = useSelector(state => state.upload.image_list)
  const is_searching = useSelector(state => state.permit.is_searching)
  const [is_searched, setIsSearched] = useState(false)

  const getUnsplashImage = (keyword) => {
    dispatch(uploadAcions.getUnsplashSV(keyword))
  }

  const chooseBook = (idx) => {
    dispatch(permitActions.isUnsplashModal(false))
    dispatch(permitActions.isUnsplashSelected(true))
    dispatch(uploadAcions.showPreview(true));
    dispatch(uploadAcions.setPreview(imageList[idx]));
  }

//책 검색
  const searchBook = ()=>{
    if(searchWord === ""){
      window.alert("검색어를 입력해주세요")
    }
    else{
      dispatch(permitActions.isSearching(true))
      getUnsplashImage(searchWord)
    }
  }

//뷰
    return(
        <React.Fragment>
            <Container is_show={props.is_unsplash_modal}>
              <ArrowBox>
                <ArrowBackIcon 
                className={classes.arrow}
                onClick={()=>{
                    dispatch(permitActions.isUnsplashModal(false))
                }}/>
              </ArrowBox>
              <SearchBox>
                <Input 
                placeholder="리뷰와 연관된 사진을 영어로 검색해보세요."
                onChange={(e)=>{
                  setSearchWord(e.target.value);
                }}
              
                onKeyPress ={(e)=>{
                  if(e.key === "Enter"){
                    searchBook();
                  }
                }}
                ></Input>
                <SearchIcon className={classes.search} onClick={()=>{searchBook()}}/>
              </SearchBox>

              {!is_searching ? 
                <LottieBox>
                  <SearchLottie/>
                </LottieBox> : 

                <ColumnBox>
                <Column>
                    {imageList?.map((url, idx)=>{
                        return(
                        <Image
                        onClick={() => {chooseBook(idx)}} 
                        src={url} 
                        key={idx}/>
                        )})}
                </Column>
                </ColumnBox>}
              


            </Container>

          <Overlay
           is_show={props.is_unsplash_modal} 
           onClick={()=>{
            dispatch(permitActions.isUnsplashModal(false))
            }}></Overlay>
        </React.Fragment>
    )
}

const Overlay = styled(CommonOverlay)`
`;

const LottieBox = styled.div`
width:100%;
height:100%;
display:flex;
justify-content:center;
align-items:center;
`

const ColumnBox = styled.div`
width:100%;
height:auto;
display:flex;
justify-content:center;
box-sizing:border-box;
`

const Column = styled.div`
width:90%;
column-width: 110px;
column-gap:10px;
`

const Image = styled.img`
width:auto;
height:auto;
max-width:103%;
display: inline-block;
transition:0.3s ease-in-out;
border-radius:10px;
cursor:pointer;
:hover{
    transform:scale(1.1);
}
`

const Container = styled(CommonContainer)`
width: 90vw;
height: 75vh;
display:flex;
justify-content: flex-start;
align-items:center;
overflow: scroll;
overflow-x: hidden;
z-index: 1000;
box-sizing:border-box;
-ms-overflow-style: none; /* IE and Edge */
scrollbar-width: none; /* Firefox */
&::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Opera*/
}

${(props) => props.is_show ? 
  `opacity:1;
  top:12%;`
  :
  `opacity:0;
  top:-100%;`
  }


@media ${(props) => props.theme.mobile} {
  left:5%;
}

@media ${(props) => props.theme.tablet} {
  width: 390px;
  margin-left:15px;
}

@media ${(props) => props.theme.desktop} {
  width: 390px;
  margin-left:15px;
}

`;

const ArrowBox = styled.div`
width:87%;
display:flex;
justify-content:flex-start;
padding:12px 0px;
`

const SearchBox = styled.div`
width:90%;
height:48px;
display:flex;
justify-content:space-between;
align-items:center;
border:1px solid ${Color.bgColor};
border-radius:10px;
margin:0 0 15px 0;
position:relative;
box-sizing:border-box;
padding:0px 10px 0px 10px;
`


const Input = styled.input`
width:80%;
height: 48px;
border: none;
background-color: transparent;
padding-left:15px;
:focus{
  outline:none;
}
&::-webkit-input-placeholder {
  color: ${Color.fontGray};
}
`;


export default UnsplashModal;
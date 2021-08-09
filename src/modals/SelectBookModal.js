//import 부분
import React, { useState } from "react";
import styled from "styled-components";
import SelectBookCard from "../components/SelectBookCard";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import SearchIcon from '@material-ui/icons/Search';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { makeStyles } from "@material-ui/core/styles";

import { useDispatch, useSelector } from "react-redux";
import { actionCreators as bookActions } from "../redux/modules/book";
import { actionCreators as permitActions } from "../redux/modules/permit";
import Color from "../shared/Color"
import { useEffect } from 'react';

const useStyles = makeStyles((theme) => ({
  arrow: {
    position: "absolute",
    top:"12px",
    right:"8px",
  },
}));


const SelectBookModal = (props) =>{
  const dispatch = useDispatch();
  const classes = useStyles()

  const search_book_list = useSelector(state => state.book.search_book_list);
  const [searchWord, setSearchWord] = useState("");
  const [is_clicked, setIsClicked] = useState(false);
  const [height, setHeight] = useState("100%");
  const [categories, setCategory] = useState(["제목","저자","출판사"])

  const openCategory = (is_clicked) => {
    return is_clicked ? setIsClicked(false) : setIsClicked(true)
  }

  const selectCategory = (category) => {

    if(category === "제목") {
      setCategory(["제목", "저자", "출판사"])
    }else if(category === "저자"){
      setCategory(["저자","출판사","제목"])
    }else{
      setCategory(["출판사","제목","저자"])
    }
  }


//책 검색
  const searchBook = ()=>{
    if(searchWord === ""){
      window.alert("검색어를 입력해주세요")
    }
    else{
      dispatch(bookActions.getSearchBooksSV(categories[0], searchWord));
      console.log(categories[0])
    }
  }

//뷰
    return(
        <React.Fragment>

            <Container>
              <ArrowBox>
                <ArrowBackIcon/>
              </ArrowBox>
              <SearchBox>
                <Category is_clicked={is_clicked}>
                  <CategoryUl is_clicked={is_clicked}>
                    {categories.map((category, idx) => {
                      return(<CategoryLi 
                        onClick={() => {
                        openCategory(is_clicked);
                        selectCategory(category);
                        }} 
                        key={idx}>
                        {category}
                      </CategoryLi>)
                    })
                    }
                  </CategoryUl>
                  {is_clicked ? 
                  <ExpandLessIcon 
                  className={classes.arrow}
                  onClick={() => {
                    openCategory(is_clicked);
                    }} />
                : <ExpandMoreIcon 
                className={classes.arrow}
                onClick={() => {
                  openCategory(is_clicked);
                  }} />}
                </Category>
                <Input 
                placeholder="도서를 검색해보세요"
              
                onChange={(e)=>{
                  setSearchWord(e.target.value);
                }}
              
                onKeyPress ={(e)=>{
                  if(e.key === "Enter"){
                    searchBook();
                  }
                }}
                ></Input>
                <SearchIcon/>
              </SearchBox>
              
              {
                search_book_list &&
                search_book_list.map((book)=>{
                  return(<SelectBookCard key={book.isbn} {...book} />)
                })
              }

            </Container>

          {/* 팝업 닫기 */}
          <Overlay 
           onClick={()=>{
            dispatch(permitActions.showModal(false));
            }}></Overlay>
        </React.Fragment>
    )
}

const Overlay = styled.div`
  width: 100vw;
  height: 100vh;
  background-color:rgba(0, 0, 0, 0.5);
  z-index: 99;
  position: fixed;
`;

const Container = styled.div`
position:absolute;
top:12%;
left:5%;
width: 90vw;
height: 75vh;
display:flex;
border-radius: 12px;
justify-content: flex-start;
align-items: center;
flex-direction:column;
text-align: center;
border: solid 1px #eeeeee; 
background: ${Color.mainColor};
overflow: scroll;
overflow-x: hidden;
z-index: 100;
box-sizing:border-box;
`;

const ArrowBox = styled.div`
width:85%;
display:flex;
justify-content:flex-start;
padding:8px 0px;
`

const SearchBox = styled.div`
width:87%;
height:48px;
display:flex;
justify-content:space-between;
align-items:center;
border:1px solid ${Color.black};
border-radius:10px;
margin:0 0 15px 0;
position:relative;
box-sizing:border-box;
padding:0px 10px 0px 80px;
padding-left:80px;
`

const Category = styled.nav`
opacity:0.9;
width:80px;
transition: ease-out 0.1s;
top:0px;
left:-1px;
position:absolute;
${(props) => props.is_clicked ? 
`height:300%;
border-right:1px solid ${Color.black};
border-bottom: 1px solid ${Color.black};
border-left: 1px solid ${Color.black};
border-radius:10px 0 10px 10px;
background-color: ${Color.category};
` : `
border-radius:10px 0 0 10px;
height:100%;
border-right:1px solid ${Color.black};
`}
`

const CategoryUl = styled.ul`
list-style:none;
height:100%;
width:100%;
margin:0;
padding:0;
overflow:hidden;
${(props) => props.is_clicked ? `
li:nth-child(1){
  border:none;
  border-bottom:1px solid ${Color.black};
  border-radius:0 0 0 10px;
}
` : `
`}
`

const CategoryLi = styled.li`
font-size:12.5px;
height:46px;
width:100%;
display:flex;
padding-left:14px;
justify-content:flex-start;
align-items:center;
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


export default SelectBookModal;
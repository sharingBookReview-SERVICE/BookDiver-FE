//import 부분
import React, { useState } from "react";
import styled from "styled-components";
import SelectBookCard from "../components/SelectBookCard";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import SearchIcon from '@material-ui/icons/Search';

import { useDispatch, useSelector } from "react-redux";
import { actionCreators as bookActions } from "../redux/modules/book";
import { actionCreators as permitActions } from "../redux/modules/permit";
import Color from "../shared/Color"


const SelectBookModal = (props) =>{
  const dispatch = useDispatch();

  const search_book_list = useSelector(state => state.book.search_book_list);
  const [searchWord, setSearchWord] = useState("");
  const [is_clicked, setIsClicked] = useState(false);
  const [height, setHeight] = useState("100%");

  const changeHeight = (is_clicked) => {
    if(is_clicked){
      setHeight("200%");
      setIsClicked(false)
    }else{
      setHeight("100%");
      setIsClicked(true)
    }
  }

//책 검색
  const searchBook = ()=>{
    if(searchWord === ""){
      window.alert("검색어를 입력해주세요")
    }
    else{
      dispatch(bookActions.getSearchBooksSV("title", searchWord));
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
                <Category onClick={() => {changeHeight(is_clicked)}} is_clicked={is_clicked}></Category>
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
align-items:center;
border:1px solid ${Color.black};
border-radius:10px;
margin:0 0 15px 0;
position:relative;
z-index:5;
`

const Category = styled.div`
width:80px;
transition: ease-in-out 0.2s;
top:0;
left:-10;
z-index:4;
${(props) => props.is_clicked ? 
`height:200%;
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


const Input = styled.input`
border-radius: 12px;
width: auto;
max-width:100%;
height: 48px;
border: none;
background-color: transparent;
margin: 0px;
padding-left:15px;
:focus{
  outline:none;
}
`;


export default SelectBookModal;
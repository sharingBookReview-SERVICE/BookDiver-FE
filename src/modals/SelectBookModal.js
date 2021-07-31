//import 부분
import React, { useState } from "react";
import styled from "styled-components";
import SelectBookCard from "../components/SelectBookCard";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as bookActions } from "../redux/modules/book";
import { actionCreators as modalActions } from "../redux/modules/modal";


const SelectBookModal = (props) =>{
  const dispatch = useDispatch();

  const search_book_list = useSelector(state => state.book.search_book_list);
  const [searchWord, setSearchWord] = useState("");

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
              <Input 
              placeholder="책이름, 저자명 등으로 검색해보세요"
             
              onChange={(e)=>{
                setSearchWord(e.target.value);
              }}
             
              onKeyPress ={(e)=>{
                if(e.key === "Enter"){
                  searchBook();
                }
              }}
              ></Input>
              
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
            dispatch(modalActions.closeModal());
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
top:10%;
left:10%;
width: 80vw;
height: 80vh;
border-radius: 12px;
justify-content: center;
align-items: center;
text-align: center;
border: solid 1px #eeeeee; 
background: #fff;
overflow: scroll;
overflow-x: hidden;
z-index: 100;
box-sizing:border-box;
`;

const Input = styled.input`
border-radius: 12px;
width: 85%;
height: 48px;
border: none;
background-color: #f5f5f5;
margin: 16px 0px;
padding-left:15px;
`;


export default SelectBookModal;
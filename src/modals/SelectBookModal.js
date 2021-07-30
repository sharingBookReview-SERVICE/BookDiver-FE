//import 부분
import React, { useState } from "react";
import styled from "styled-components";
import SelectBookCard from "../components/SelectBookCard";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as bookActions } from "../redux/modules/book";


const SelectBookModal = (props) =>{
  const dispatch = useDispatch();
  const all_book_list = useSelector(state => state.book.all_book_list);
  const {setOpenSelect, setBookId} = props;


//useEffect
React.useEffect(()=>{
  dispatch(bookActions.getAllBookSV());
},[]);


//뷰

    return(
        <React.Fragment>

            <Container>
              <Input placeholder="책이름, 저자명 등으로 검색해보세요"></Input>
              {
                all_book_list.map((book)=>{
                  return <SelectBookCard key={book.isbn} {...book} setBookId={setBookId} setOpenSelect={setOpenSelect}></SelectBookCard>
                })
              }
            </Container>

          <Overlay 
           onClick={()=>{
            setOpenSelect(false);
            console.log("클릭")
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
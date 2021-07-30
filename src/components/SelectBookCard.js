//import 부분
import React from "react";
import styled from "styled-components"

const SelectBookCard = (props) =>{
  const {title, author, image, bookId,setBookId, setOpenSelect, isSelected} = props;
 
    return(
      <BookInfoWrapper>
        {
          isSelected ?
          <BookInfoBox
          onClick={()=>{
            setOpenSelect(true);
            }}>
            <BookImg src={image}/>
            <BookDescBox>
                <BookTitle>{title}</BookTitle>
                <BookWriter>{author} 저</BookWriter>
            </BookDescBox>
            </BookInfoBox>
            :
            <BookInfoBox 
          onClick={()=>{
            setBookId(bookId);
            setOpenSelect(false);
            }}>
            <BookImg src={image}/>
            <BookDescBox>
                <BookTitle>{title}</BookTitle>
                <BookWriter>{author} 저</BookWriter>
            </BookDescBox>
            </BookInfoBox>
        }

      </BookInfoWrapper>
    )
}

const BookInfoWrapper = styled.div`
width:100%;
box-sizing:border-box;
padding:0px 24px 16px 24px;
`

const BookInfoBox = styled.div`
width: 100%;
height: 112px;
display: flex;
flex-direction: row;
justify-content: flex-start;
align-items: center;
gap: 12px;
padding: 16px;
border-radius: 12px;
border: solid 1px #eeeeee;
box-sizing: border-box;
`

const BookImg = styled.img`
width:60px;
height:80px;
border-radius:4px;
background-color: #c4c4c4;

`


const BookDescBox = styled.div`
  display: flex;
  flex-direction: column;
  box-sizing:border-box;
`

const BookTitle = styled.p`
  color:#1168d7;
  font-size: 14px;
  font-weight: bold;
  letter-spacing: -0.28px;
  line-height: 1.43;
  margin: 0px 0px 5px 0px;
  text-align: left;
`

const BookWriter = styled.p`
font-size: 13px;
line-height: 1.43;
letter-spacing: -0.28px;
text-align: left;
color:#c7c7c7;
line-height: 1.43;
margin:0px;
`


export default SelectBookCard;
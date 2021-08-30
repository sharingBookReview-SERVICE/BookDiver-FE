import React from "react";
import styled from "styled-components";
import { history } from "../redux/configStore";

import Color from "../shared/Color"
const BookCard = (props) =>{

  const bookTitle = props?.title.replace(/<(\/)?([a-zA-Z]*)(\s[a-zA-Z]*=[^>]*)?(\s)*(\/)?>/ig, "").split("(")[0] 
  const bookAuthor =props?.author.replace(/<(\/)?([a-zA-Z]*)(\s[a-zA-Z]*=[^>]*)?(\s)*(\/)?>/ig, "").split("(")[0] 

  const gotoBookDetail = ()=>{
    history.push(`/bookdetail/${props?.isbn}`)
  }

  
    return(
      
            <Outter
              onClick = {()=>{
                gotoBookDetail()
              }}
            >
                <BookImg url={props.image}/>
                <BookDescBox>
                    <BookTitle>{bookTitle}</BookTitle>
                    <BookWriter>{bookAuthor}</BookWriter>
                </BookDescBox>

            </Outter>
       
    )
}

BookCard.defaultProps ={
  image: "https://i.pinimg.com/564x/93/1f/39/931f390f4037e44ee162d9d4f4cd6663.jpg"
}

const Outter = styled.div`
display: flex;
flex-direction: column;
align-items: center;
width: 100%;
height: 100%;
transition: all 0.2s linear;
cursor:pointer;
&:hover{
  transform: scale(1.1);
}
`;

const BookImg = styled.div`
  width: 90px;
  height: 120px;
  background-color: #c4c4c4;
  background-image: url(${(props) => props.url ? props.url : "https://i.pinimg.com/564x/93/1f/39/931f390f4037e44ee162d9d4f4cd6663.jpg"});
  background-size: cover;
  box-sizing: border-box;
 
`


const BookDescBox = styled.div`
width: 90px;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
  }
`

const BookTitle = styled.div`
  width: 90px;
  height: auto;
  color: ${Color.fontBlack};
  font-size: 14px;
  letter-spacing: -0.28px;
  line-height: 1.43;
  margin: 0 0 5px 2px;
  text-align: left;
  font-weight: bolder;
`

const BookWriter = styled.div`
width: 90px;
  font-size: 14px;
  line-height: 1.43;
  letter-spacing: -0.28px;
  text-align: left;
  color: ${Color.fontGray};
  font-family: 'Noto Sans KR', sans-serif;
  line-height: 1.43;
  margin: 0px 0px 5px 2px;
`

export default BookCard;
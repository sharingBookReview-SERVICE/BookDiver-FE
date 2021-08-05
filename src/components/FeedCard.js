import React from "react";
import styled from "styled-components";

const FeedCard = () => {
//깃플로우 테스트
    return(
        <React.Fragment>
            <BookImg>
                <Img src="https://post-phinf.pstatic.net/MjAxNzExMTZfMjUw/MDAxNTEwODE3MzcwMDA2.NH_E-zSk-oPiP-rHbyug5S1yjqwtsVaXCpkZ8cIe-eMg.DjSy2wkDhcW5nG55u3wIiIKIK3RcH79xzsuV4xvXarsg.JPEG/GettyImages-jv11022556.jpg?type=w1200"/>
            </BookImg>
        </React.Fragment>
    )
}

export default FeedCard;
const  BookImg = styled.div`
    width: auto;
`
const Img = styled.img`
  width: 30vw;
  height: 15.5vh;
  border-radius: 10px;
`;
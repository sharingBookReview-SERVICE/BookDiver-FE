import React from "react";
import styled from "styled-components";

const FeedCard = () => {
//깃플로우 테스트
    return(
        <React.Fragment>
            <FeedImg>
                <Img> <BookImg src="https://mblogthumb-phinf.pstatic.net/MjAxODEwMThfMjc4/MDAxNTM5ODM1NTU5NTI4.sIM6_wv8ns_jvl1RSYyctIAMgq1if2s-PzPuDI3h-iQg.UZZTT5jXNNam23VHWkflYgFmrnKQGPV8eZJ4W7Vr7V0g.JPEG.zencstory/0.jpg?type=w800"/></Img>
            </FeedImg>
        </React.Fragment>
    )
}

export default FeedCard;
const FeedImg = styled.div`
    width: auto;
`
const Img = styled.div`
  width: 100%;
  height: 100%;
  display: table-row;
  border-collapse:collapse;
`;

const BookImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit:cover;
  border: 1px solid #e1d9d0;
`;
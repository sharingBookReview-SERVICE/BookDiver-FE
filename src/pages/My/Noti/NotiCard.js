import React from "react";
import styled from "styled-components";
import Color from "../../../shared/Color";
import { history } from "../../../redux/configStore";
import { useDispatch } from "react-redux";

import { actionCreators as permitActions } from "../../../redux/modules/permit";


const NotiCard = (props)=>{

    const dispatch = useDispatch()
    const {comment, reviewId, sender, type, koreaTime} = props

    const image = reviewId?.image
    const userName = sender?.nickname
    const _reviewId = reviewId?.id
    const _bookId = reviewId?.book
    const otherUserId = sender?.id


    const NotiType = {
        comment: "내가 쓴 게시물",
        like: "내가 쓴 게시물",
        follow:"새로운 팔로워",
    }

    const userNameDesc = {
        comment: "님이 댓글을 남겼습니다.",
        like: "님이 좋아요를 눌렀습니다.",
        follow:"님이 나를 팔로우하기 시작합니다.",
    }

    const goToReviewDetail = () => {
        history.push(`/reviewdetail/${_bookId}/${_reviewId}?comment=true`)
    }   

    const userFeed = () => {
        dispatch(permitActions.isLoading(true))
        history.push(`/otherUser/${otherUserId}`)
    }

    const locationType = {
        comment: goToReviewDetail,
        like: goToReviewDetail,
        follow: userFeed,
    }


    return(
    <Outter>
        <TextBox 
        onClick={() => {locationType[type]()}}>

            <TypeWrapper>
                <Text style={{marginRight:"7px"}}>{NotiType[type]}</Text>
                <Text style={{fontSize:"11px"}}>{koreaTime}</Text>
            </TypeWrapper>

            <Text style={{margin:"4px 0px"}}>
                <NickName>{userName}</NickName>
                {userNameDesc[type]}
            </Text>

            {comment && <Text>{comment}</Text>}

        </TextBox>

    {type !== "follow" && 
    <Image
        onClick={() => {locationType[type]()}} 
        url={image}>

        </Image>}
    </Outter>
    )
}

export default NotiCard;


const Outter= styled.div`
margin: 0 auto;
padding: 16px 25px;
margin-bottom: 16px;
display:flex;
aligin-items:flex-start;
justify-content:space-between;
`;

const TextBox = styled.div`
display: flex;
flex-direction:column;
justify-content: space-between;
color: ${Color.fontGray};
cursor:pointer;

@media ${(props) => props.theme.mobile} {
    width:70%;
  }

`;

const TypeWrapper = styled.div`
display:flex;
align-items:center;
`

const Text = styled.div`
color:${Color.quote};
`;

const NickName = styled.span`
font-weight:bold;
color:${Color.black};
margin:10px 0px;
`

const Image = styled.div`
background-image:url(${(props) => props.url});
width:48px;
height:48px;
border-radius:10px;
background-size:cover;
cursor:pointer;
`
import React,{useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import { actionCreators as userActions } from "../../redux/modules/user";
import styled from "styled-components";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { makeStyles } from "@material-ui/core/styles";
import Color from "../../shared/Color";
import {history} from "../../redux/configStore";
import RemoveRedEyeIcon from '@material-ui/icons/RemoveRedEye';

const useStyles = makeStyles((theme) => ({
  arrow: {
      color: Color.black,
      cursor:"pointer",
    },
}));
const Bookmark = (props) =>{
    const dispatch = useDispatch();
   const classes = useStyles();
   const bookmark_reviews = useSelector(state=> state.user.bookmark);
    const [bookMode, setBookMode] = useState(false);
    const book_count = parseInt(bookmark_reviews?.length/4 +1);

    useEffect(()=>{
        dispatch(userActions.getBookmarkSV());
    },[])

    const goBack=() => {
        history.push("/myfeed");
    }
    return(
       <Container>
        <Header>
            <ArrowBackIcon 
            onClick={() => {
                goBack()
            }} 
            className={classes.arrow}/>
            <HeaderText>저장된 게시물</HeaderText>
        </Header>
        
        {
            bookMode?
            <FeedCategoryButton onClick ={()=>{setBookMode(false)}}>
                <RemoveRedEyeIcon/>
                리뷰모드
            </FeedCategoryButton>
            :
                <FeedCategoryButton onClick ={()=>{setBookMode(true)}}>
                <RemoveRedEyeIcon />
                책장모드
            </FeedCategoryButton>
        }
        
        <FeedMain>
        {
            bookmark_reviews?.map((p)=>{
                return(
                    <FeedCard key={p.id} url = {p?.image}/>
                )
            })
        }
        

            </FeedMain>


        </Container>
    )
}


const Container = styled.div`
background: ${Color.mainColor};
width: 100vw;
min-height: 100vh;
margin-bottom: 70px;
position: absolute;

@media ${(props) => props.theme.mobile} {
  padding-bottom: 150px;
}

@media ${(props) => props.theme.tablet} {
  width: 100%;
  padding-bottom: 130px;
}

@media ${(props) => props.theme.desktop} {
  width: 100%;
  padding-bottom: 130px;
}
`;

const Header = styled.div`
width: 100%;
height: 56px;
display:flex;
justify-content:space-between;
align-items:center;
background-color: ${Color.mainColor};
position:fixed;
top:0px;
padding:0px 10px 0px 10px;
box-sizing:border-box;
z-index:10;

@media ${(props) => props.theme.tablet} {
    width: 420px;
}
  
@media ${(props) => props.theme.desktop} {
    width: 420px;
}

`

const HeaderText = styled.div`
font-size:16px;
color:${Color.black};
margin-right:15px;
    width: 100%;
    justify-content: center;
    align-items: center;
    display: flex;
`

const FeedCategoryButton = styled.div`
cursor:pointer;
width:85px;
height:34px;
border:1px solid black;
border-radius:10px;
display:flex;
justify-content:center;
align-items:center;
color:black;
font-size:14px;
margin-top: 57px;
    margin-left: 75%;
 
`
const FeedMain = styled.div`
  background-color: #f5f2f0;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 1px;
  padding-top: 10px;
`;


const FeedCard = styled.div`
width: 100%;
padding-top: 100%;
background-image:URL( ${(props)=> (props.url)});
background-size: cover;
background-position: center center;
cursor:pointer;
`;
export default Bookmark;
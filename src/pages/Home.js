//import 부분
import React, { useEffect, useState, useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as permitAction } from "../redux/modules/permit";
import { actionCreators as reviewActions } from "../redux/modules/review";
import { useInView } from "react-intersection-observer";
import { history } from "../redux/configStore";

import styled from "styled-components";
import ReviewCard from "../components/ReviewCard";
import AddIcon from "@material-ui/icons/Add";
import Header from "../components/Header";
import EditModal from "../modals/EditModal";
import LoginModal from "../modals/LoginModal";
import NotSupport from "../modals/NotSupport"


import Color from "../shared/Color"


const Home = (props) => {
  //dispatch와 변수들
  const dispatch = useDispatch();
  const reviewList = useSelector((state) => state.review.all_review_list);

  //modal permit boolean
  const is_edit_modal = useSelector((state) => state.permit.is_edit_modal);
  const show_login_modal = useSelector((state) => state.permit.show_login)
  const is_support_modal = useSelector((state) => state.permit.is_support_modal)
  const is_loading = useSelector((state) => state.permit.is_loading)

  const [Id, setId] = useState([])
  const [ref, inView] = useInView();

  const getMoreReview = (lastId) => {
    if(lastId) return dispatch(reviewActions.getMoreReviewSV(lastId));
  }

  if(!reviewList){
    history.push("*")
  }


  //로딩이 되고나면, 네이게이션을 없애주기.
  useEffect(() => {
    dispatch(permitAction.showNav(true));
    dispatch(reviewActions.getAllReviewSV());

    return() => {
    dispatch(permitAction.showEditModal(false));
    }
  }, []);

  useEffect(() => {
    setId(reviewList)
  }, [reviewList]);

  useEffect(() => {

    if(inView){
      const lastReviewId = Id[Id.length - 1]?._id
      dispatch(permitAction.isLoading(true))
      getMoreReview(lastReviewId)
    }
  }, [inView]);


  //scroll 이벤트 관련
  const lastScroll = useSelector(state=> state.review.current_scroll);
  var timer;
  const scroll = (e)=>{
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(function() {
      dispatch(reviewActions.saveCurrentScroll(e.target.scrollTop))
    }, 2000);
  
  }

  const container = useRef(null);
  useEffect(()=>{
    container.current.scrollTo(0, lastScroll);

  },[])
  //뷰
  return (
    <Container  onScroll={scroll} ref={container}>
      <HomeBGColor>
        <Header />
 
        {reviewList?.map((review) => {
              return (
                    <ReviewCard {...review} key={review.id}/> 
              );
        })}

      <div ref={ref}></div>
      </HomeBGColor>  
      <NotSupport is_support_modal={is_support_modal}/>
      <EditModal is_edit_modal={is_edit_modal}/>
      <LoginModal show_login_modal={show_login_modal}/>
    </React.Fragment>
  );
};
const Container = styled.div`
position: absolute;
  width: 100vw;
  height: 100vh;
  background: ${Color.mainColor};
  overflow-y: ${(props) => props.is_modal_opened};
  overflow-x: hidden;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
  }
  background-color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  box-sizing: border-box;
  padding: ${(props) => props.is_padding ? "0px 0px 60px 0px" : "0"};
  position: relative;


  @media ${(props) => props.theme.tablet} {
    width:420px;
    height:100vh;
  }

  @media ${(props) => props.theme.desktop} {
    width:420px;
    height:100vh;
  }

`;
const Spinner = styled.img`
width:150px;
height:150px;
position:fixed;
top:40%;
margin-left:130px;
`

const HomeBGColor = styled.div`
  background-color: ${Color.mainColor};
  box-sizing: border-box;
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  position:absolute;

  @media ${(props) => props.theme.mobile} {
    padding: 120px 0 0 0;
  }

  @media ${(props) => props.theme.tablet} {
    padding: 80px 0 0 0;
  }

  @media ${(props) => props.theme.desktop} {
    padding: 80px 0 0 0;
  }
`;


export default Home;

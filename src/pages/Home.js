//import 부분
import React, { useEffect, useState, useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as permitAction } from "../redux/modules/permit";
import { actionCreators as reviewActions } from "../redux/modules/review";
import { useInView } from "react-intersection-observer";
import { history } from "../redux/configStore";

import styled from "styled-components";
import {ReviewCard, Header} from "../components";
import {EditModal,LoginModal,NotSupport} from "../modals";

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
    console.log("useeffect1")
    dispatch(permitAction.showNav(true));
    if(reviewList.length <10){
      dispatch(reviewActions.getAllReviewSV());
    }
    return() => {
    dispatch(permitAction.showEditModal(false));
    }
  }, []);

  useEffect(() => {
    console.log("useeffect2")
    setId(reviewList)
  }, [reviewList]);

  useEffect(() => {
    console.log("useeffect3")
    if(inView){
      const lastReviewId = Id[Id.length - 1]?._id
      dispatch(permitAction.isLoading(true))
      getMoreReview(lastReviewId)
    }
  }, [inView]);


  //scroll 이벤트 관련
  
  let timer;
  const scroll = (e)=>{
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(function() {
      dispatch(reviewActions.saveCurrentScroll(e.target.scrollTop))
    }, 500);
  
  }
  const scrollToTop = () => {
    container.current.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }
  const lastScroll = useSelector(state=> state.review.current_scroll);
  const container = useRef(null);

  useEffect(()=>{
    console.log("useeffect4")
      container.current.scrollTo(0, lastScroll);
  },[])
  //뷰
  return (
    <>
    <Container  onScroll={scroll} ref={container}>
        <Header />
        {/* <GoToTopBtn onClick={()=>{scrollToTop()}}/> */}
        {reviewList?.map((review) => {
              return (
                    <ReviewCard {...review} key={review.id}/> 
              );
        })}

      <div ref={ref}></div>
    </Container>
    <NotSupport is_support_modal={is_support_modal}/>
    <EditModal is_edit_modal={is_edit_modal}/>
    <LoginModal show_login_modal={show_login_modal}/>
    </>
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
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  box-sizing: border-box;
  padding :120px 0px;


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

const GoToTopBtn = styled.button`

width: 70px;
height: 70px;
border-radius: 70px;
background-color: black;
position: fixed;
z-index: 100;
bottom: 100px;
right: 10px;

`;
export default Home;

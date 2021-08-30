//import 부분
import React, { useEffect, useState, useRef, useCallback, createRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as permitAction } from "../redux/modules/permit";
import { actionCreators as reviewActions } from "../redux/modules/review";
import { actionCreators as userActions } from "../redux/modules/user";
import { useInView } from "react-intersection-observer";
import { history } from "../redux/configStore";

//소켓
import io from "socket.io-client"

import styled from "styled-components";
import {ReviewCard, Header} from "../components";
import {EditModal,LoginModal,NotSupport,CheckTreasureModal,NotFound} from "../modals";

import spinner from "../img/Spin-1s-200px.gif"
import Color from "../shared/Color"
import Loading from "../pages/ETC/Loading"
import Spinner from "../components/Spinner"

const socket = io.connect("https://ohbin.shop")

const Home = (props) => {
  //dispatch와 변수들
  const dispatch = useDispatch();
  const reviewList = useSelector((state) => state.review.all_review_list);

  //modal permit boolean
  const is_edit_modal = useSelector((state) => state.permit.is_edit_modal);
  const show_login_modal = useSelector((state) => state.permit.show_login)
  const is_support_modal = useSelector((state) => state.permit.is_support_modal)
  const is_not_found = useSelector((state) => state.permit.is_not_found)
  const is_loading = useSelector((state) => state.permit.is_loading)
  const is_treasure = useSelector((state) => state.permit.is_treasure_modal)
  const userId = useSelector((state) => state.user.user._id); //내 아이디
  const is_loaded = useSelector((state) => state.permit.is_loaded)
  const [isRecentCategory, setIsRecentCategory] = useState(false)
  const reviewLoading = useSelector((state) => state.permit.reviewLoading)


  
  const [Id, setId] = useState([])
  const [ref, inView] = useInView();

  //-----------옵저버 테스트 
  const ReviewCount = reviewList.length;
  const [elRefs,setElRefs] = useState([]);

  const getRecentReview = () => {
    dispatch(reviewActions.getRecentReviewSV())
  }

  const getSocialReview = () => {
    dispatch(reviewActions.getAllReviewSV());
  }

  //게시물 하나당 ref를 붙이기 위한 작업
  useEffect(() => {
    setElRefs(elRefs => (
      Array(ReviewCount).fill().map((_,i) => elRefs[i] || createRef())
    ))
  },[ReviewCount])

const onIntersect = async([entry], observer) => {
    if (!entry.isIntersecting) {
      return
    }
    const showedReviewIdx = [entry][0].target.dataset.idx
    const showedReviewId = Id[showedReviewIdx]?._id
    console.log(showedReviewId)

    observer.unobserve(entry.target)
    dispatch(reviewActions.checkIsRead(showedReviewId))
}

useEffect(() => {
  let observer
    if(elRefs[0] && !is_loading){
    observer = new IntersectionObserver(onIntersect, {threshold: 0.5});
    reviewList.forEach((_, idx) => {
      observer.observe(elRefs[idx].current)
    });
  }
  return () => observer?.disconnect();
},[elRefs])


  let is_render = false;

  //useEffect 실행 이후에도 불러온 리뷰가 없다면, 에러 안내 화면으로 보내기
  if(is_render){
    if(reviewList.length === 0){
      localStorage.clear();
      history.push("*")
    }
  }

  let isPageOut = false
  isPageOut = localStorage.getItem("isPageOut")

  //로딩이 되고나면, 네이게이션을 없애주기.
  useEffect(() => {
    dispatch(userActions.checkTreasureSV()) //보물을 얻었는지 확인하기
    dispatch(permitAction.showNav(true));

    //로컬스토리지의 피드 타입을 확인해서, 화면이 시작될떄마다 요청하는 피드의 종류를 다르게 하기 
    const _isRecentCategory = localStorage.getItem("isRecentCategory")
    if(reviewList.length <10 && !_isRecentCategory){
      getSocialReview()
    }else if(reviewList.length <10 && _isRecentCategory){
      getRecentReview()
    }
    setTimeout(() => {
      dispatch(permitAction.isLoading(false))
    }, 600);
    return() => {
    dispatch(permitAction.showEditModal(false));
    }
  }, []);


  //로컬스토리지에서 피드타입을 가져오기 
  useEffect(() => {
    if(isPageOut){
      const _feedType = localStorage.getItem("isRecentCategory")
      setIsRecentCategory(_feedType)
    }
    return () => {
      localStorage.setItem("isRecentCategory", isRecentCategory)
      localStorage.setItem("isPageOut", true)
    }
  }, []);

  //인피니티 스크롤 구현을 위한, 리뷰 아이디 갯수 세기
  useEffect(() => {
    setId(reviewList)
  }, [reviewList]);

  const getMoreReview = (lastId) => {
    //리뷰 더 불러오기 로딩
    dispatch(permitAction.reviewLoading(true))
    if(lastId && !isRecentCategory){
      // 소셜피드일 때, 무한스크롤 함수
      return dispatch(reviewActions.getMoreReviewSV(lastId)); 
    }else{
       // 최신피드일 떄, 무한스크롤 함수
      return dispatch(reviewActions.getMoreRecentReviewSV(lastId));
    }
  }

  //infinite scroll
  useEffect(() => {
    if(inView){
      const lastReviewId = Id[Id.length - 1]?._id
      getMoreReview(lastReviewId)
    }
    return () => {
      dispatch(permitAction.isLoaded(false))
    }
  }, [inView]);


  //scroll 이벤트 관련
  
  let timer;
  const scroll = (e)=>{
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(function() {
      // dispatch(reviewActions.saveCurrentScroll(e.target.scrollTop))
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
      container?.current?.scrollTo(0, lastScroll);
  },[])

  //뷰
  return (
    <>
{is_loading ? 
<Loading/> : <Container  onScroll={scroll} ref={container}>
        <Header />
        <FeedCategoryWrapper>
          <SocialFeed 
          onClick={() => {
            getSocialReview()
            setIsRecentCategory(false)}} 
          isRecentCategory={isRecentCategory}>
            소셜피드
          </SocialFeed>
          <RecentFeed 
          onClick={() => {
            setIsRecentCategory(true)
            getRecentReview()
          }}
          isRecentCategory={isRecentCategory}>
            최신피드
          </RecentFeed>
          <CategoryBar isRecentCategory={isRecentCategory}/>
        </FeedCategoryWrapper>

        {/* <GoToTopBtn onClick={()=>{scrollToTop()}}/> */}

        {reviewList.length > 0 && reviewList.map((review, idx) => {
              return (
                    <ReviewCard
                    setIdx={idx}
                    setRef={elRefs[idx]}
                    {...review}
                    key={review.id}/> 
              );
        })}
      {/* {reviewLoading && <Spinner src={spinner}/>} */}
      {is_loaded && <div ref={ref} ></div>}
      </Container>}
    <NotSupport is_support_modal={is_support_modal}/>
    <EditModal is_edit_modal={is_edit_modal}/>
    <NotFound is_found_modal={is_not_found}/>
    <LoginModal show_login_modal={show_login_modal}/>
    <CheckTreasureModal is_treasure={is_treasure}/>
    </>
  );
};

const FeedCategoryWrapper = styled.div`
width:100%;
height:60px;
display:grid;
flex-direction: row;
grid-template-columns: 1fr 1fr;
padding:0px 20px;
box-sizing:border-box;
background:${Color.mainColor};
position:relative;
`

const CategoryBar = styled.hr`
position:absolute;
width:40%;
border:1px solid ${Color.secondColor};
border-radius:1px;
bottom:-8px;
left:7.5%;
transition:0.5s ease-in-out;
${(props) => props.isRecentCategory ? 
`
left:52.5%`
:
""};
`

const SocialFeed = styled.div`
width:100%;
height:auto;
display:flex;
justify-content:center;
align-items:center;
transition:0.5s ease-in-out;
cursor:pointer;
:hover{
  color:${Color.fontBlack};
}
${(props) => props.isRecentCategory ? `color:${Color.quote}`:"font-weight:bold"};
`

const RecentFeed = styled.div`
width:100%;
height:auto;
display:flex;
justify-content:center;
align-items:center;
transition:0.5s ease-in-out;
cursor:pointer;
:hover{
  color:${Color.fontBlack};
}
${(props) => props.isRecentCategory ? "font-weight:bold" : `color:${Color.quote}`};
`


const Container = styled.div`
position: absolute;
  width: 100vw;
  height: 100vh;
  ${(props) => props.loading ? `
  background: ${Color.mainColor};
  `: `
  background: ${Color.bgColor};
  `};

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
  padding: 60px 0px;


  @media ${(props) => props.theme.tablet} {
    width:420px;
    height:100vh;
  }


  
  @media ${(props) => props.theme.desktop} {
    width:420px;
    height:100vh;
  }

`;

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

// const Spinner = styled.img`
// width:50px;
// height:50px;
// margin-bottom:50px;
// `

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
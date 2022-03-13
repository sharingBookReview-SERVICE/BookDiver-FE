import React, { useEffect, useState, useRef, createRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as permitAction } from "../redux/modules/permit";
import { actionCreators as reviewActions } from "../redux/modules/review";
import { actionCreators as userActions } from "../redux/modules/user";
import { useInView } from "react-intersection-observer";
import { history } from "../redux/configStore";

import styled from "styled-components";
import {ReviewCard, Header} from "../components";
import {EditModal,LoginModal,CheckTreasureModal,NotFound} from "../modals";

import Color from "../shared/Color"
import Loading from "../pages/ETC/Loading"
import NomoreLottie from "../img/lottie/NomoreLottie";

const Home = (props) => {
  const dispatch = useDispatch();

  const reviewList = useSelector((state) => state.review.all_review_list);
  const feedType = useSelector((state) => state.permit.feed_type)

  //--모달 permit boolean
  const is_edit_modal = useSelector((state) => state.permit.is_edit_modal);
  const show_login_modal = useSelector((state) => state.permit.show_login)
  const is_treasure = useSelector((state) => state.permit.is_treasure_modal) // 보물 얻었다는 모달 

  //--permit 변수들 
  const is_not_found = useSelector((state) => state.permit.is_not_found)
  const is_loading = useSelector((state) => state.permit.is_loading)

  //보물얻었다는 모달을 띄우기 위한 변수 

  const is_loaded = useSelector((state) => state.permit.is_loaded)
  const is_review_finished = useSelector((state) => state.permit.finish_review)

  
  const [_reviewId, setReviewId] = useState([])
  const [ref, inView] = useInView();


  //피드의 타입을 바꾸기 
  const changeFeedType = (type) => {
    dispatch(permitAction.isLoaded(false)) //피드의 타입을 바꾸는 동안에는 무한스크롤 옵저버를 숨기기
    dispatch(permitAction.feedType(type))
  }

  //최신리뷰 불러오기 
  const getRecentReview = () => {
    dispatch(reviewActions.getRecentReviewSV())
  }

  //소셜리뷰 불러오기 
  const getSocialReview = () => {
    dispatch(reviewActions.getAllReviewSV());
  }

  //로딩이 되고나면, 네이게이션을 없애주기.
  useEffect(() => {
    dispatch(userActions.checkTreasureSV()) //보물을 얻었는지 확인하기
    dispatch(permitAction.showNav(true));

    //피드 타입을 확인해서, 화면이 시작될때마다 요청하는 피드의 종류를 다르게 하기 
    if(reviewList.length <10 && feedType ===" social"){
      getSocialReview()
    }else if(reviewList.length <10 && feedType === "recent"){
      getRecentReview()
    }
    setTimeout(() => {
      dispatch(permitAction.isLoading(false))
    }, 600);
    return() => {
    dispatch(permitAction.showEditModal(false));
    }
  }, []);


  //-----------리뷰의 읽음을 보내기 
  const ReviewCount = reviewList.length;
  const [elRefs,setElRefs] = useState([]);

  //게시물 하나당 ref를 붙이기 위한 작업
  useEffect(() => {
    setElRefs(elRefs => (
      Array(ReviewCount).fill().map((_,i) => elRefs[i] || createRef())
    ))
  },[ReviewCount])

  //인피니티 스크롤 구현을 위한, 리뷰 아이디 갯수 세기
  useEffect(() => {
    setReviewId(reviewList)
  }, [reviewList]);

//옵저버가 관찰될 때, 실행할 함수 => 해당 게시물의 아이디 값을 서버에 보내서, 사용자가 이 게시물을 '읽었다'는 것을 체크해주기 
  const sendIsRead = async([entry], observer) => {
    if (!entry.isIntersecting) {
      return
    }
    const showedReviewId = [entry][0].target.dataset.id
    observer.unobserve(entry.target) // 함수가 실행될 때, 관찰을 끝내기.
    dispatch(reviewActions.checkIsRead(showedReviewId)) //관찰한 게시물의 아이디를 보내기
}


  useEffect(() => {
  let observer

  //ref요소가 존재하고, 페이지의 로딩이 끝나면 옵저버 인스턴스를 생성하기. 
    if(elRefs[0] && !is_loading){
    // 절반반 읽어도, 게시물 읽음을 보내기 
    observer = new IntersectionObserver(sendIsRead, {threshold: 0.5});
    reviewList.forEach((_, idx) => {
      //리뷰의 갯수만큼 생성된 ref에 옵저버를 붙이기
      observer.observe(elRefs[idx].current)
    });
  }
  //화면을 나갈때 옵저버의 연결을 해제하기. 
  return () => observer?.disconnect();
  },[elRefs])


  //useEffect 실행 이후에도 불러온 리뷰가 없다면, 에러 안내 화면으로 보내기
  let is_render = false;

  if(is_render){
    if(reviewList.length === 0){
      localStorage.clear();
      history.push("*")
    }
  }

  //---무한스크롤을 위한 리뷰 더 불러오기 
  const getMoreReview = (lastId) => {
    //리뷰 더 불러오기 로딩
    dispatch(permitAction.reviewLoading(true))

    if(lastId && feedType === "social"){
      // 소셜피드일 때, 리뷰 더 불러오기 함수
      return dispatch(reviewActions.getMoreReviewSV(lastId)); 
    }else if(lastId && feedType === "recent"){
       // 최신피드일 떄, 리뷰 더 불러오기 함수 
      return dispatch(reviewActions.getMoreRecentReviewSV(lastId));
    }
  }

  //infinite scroll
  useEffect(() => {
    dispatch(permitAction.isLoaded(true))
    if(inView){
      const lastReviewId = _reviewId[_reviewId.length - 1]?._id
      getMoreReview(lastReviewId)
    }

    //화면에서 떠나면 무한스크롤을 위한 옵저버를 숨긴다. 
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
      dispatch(reviewActions.saveCurrentScroll(e.target.scrollTop))
    }, 500);

  }

  const lastScroll = useSelector(state=> state.review.current_scroll);
  const container = useRef(null);

  useEffect(()=>{
      container?.current?.scrollTo(0, lastScroll);
  },[is_loading])


  //카테고리 선택버튼 메모라이징
  const MemorizedCategory = React.memo(() => {
    return(
      <>
      <SocialFeed 
      onClick={() => {
        getSocialReview()
        changeFeedType("social")}} 
        feedType={feedType}>
        소셜피드
      </SocialFeed>
      <RecentFeed 
      onClick={() => {
        changeFeedType("recent")
        getRecentReview()
      }}
      feedType={feedType}>
        최신피드
      </RecentFeed>
      </>
    )
  })

  //뷰
  return (
    <>
  {
    is_loading ? 
    <Loading/> : 
      <Container  onScroll={scroll} ref={container}>
        <Header />
        <FeedCategoryWrapper>
        <MemorizedCategory/>
        <CategoryBar feedType={feedType}/>
        </FeedCategoryWrapper>
        {reviewList.length > 0 && reviewList.map((review, idx) => {
              return (
                    <ReviewCard
                    setRef={elRefs[idx]}
                    {...review}
                    key={review.id}/> 
              );
        })}

      { is_loaded && <div ref={ref} ></div> }
      { is_review_finished && <NomoreLottie/> }
      </Container>
      }

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
${(props) => props.feedType === "recent" ? 
`
left:52.5%`
:
""};
`

const SocialFeed = styled.div`
width:100%;
height:60px;
display:flex;
justify-content:center;
align-items:center;
transition:0.5s ease-in-out;
cursor:pointer;
:hover{
  color:${Color.fontBlack};
}
${(props) => props.feedType === "recent" ? `color:${Color.quote}`:"font-weight:bold"};
`

const RecentFeed = styled.div`
width:100%;
height:60px;
display:flex;
justify-content:center;
align-items:center;
transition:0.5s ease-in-out;
cursor:pointer;
:hover{
  color:${Color.fontBlack};
}
${(props) => props.feedType === "recent" ? "font-weight:bold" : `color:${Color.quote}`};
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

export default Home;
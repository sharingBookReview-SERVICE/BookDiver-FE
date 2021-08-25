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
import {EditModal,LoginModal,NotSupport,CheckTreasureModal} from "../modals";

import Color from "../shared/Color"
import Loading from "../pages/ETC/Loading"

const socket = io.connect("https://ohbin.shop")

const Home = (props) => {
  //dispatch와 변수들
  const dispatch = useDispatch();
  const reviewList = useSelector((state) => state.review.all_review_list);

  //modal permit boolean
  const is_edit_modal = useSelector((state) => state.permit.is_edit_modal);
  const show_login_modal = useSelector((state) => state.permit.show_login)
  const is_support_modal = useSelector((state) => state.permit.is_support_modal)
  const is_loading = useSelector((state) => state.permit.is_loading)
  const is_treasure = useSelector((state) => state.permit.is_treasure_modal)
  const userId = useSelector((state) => state.user.user._id); //내 아이디

  
  const [Id, setId] = useState([])
  const [ref, inView] = useInView();
  const multiRef = useRef();
  const [inViewRef, testInView] = useInView();

  const setRefs = useCallback(
    (node) => {
      // Ref's from useRef needs to have the node assigned to `current`
      multiRef.current = node;
      // Callback refs, like the one from `useInView`, is a function that takes the node as an argument
      inViewRef(node);
    },
    [inViewRef],
  );

  const ReviewCount = reviewList.length;
  const [elRefs,setElRefs] = useState([]);

  useEffect(() => {
    setElRefs(elRefs => (
      Array(ReviewCount).fill().map((_,i) => elRefs[i] || createRef())
    ))
  },[ReviewCount])


 //리뷰 더 불러오기 
  const getMoreReview = (lastId) => {
    if(lastId) return dispatch(reviewActions.getMoreReviewSV(lastId));
  }

  let is_rendered = false
  console.log(reviewList.length, is_rendered)

  //useEffect 실행 이후에도 불러온 리뷰가 없다면, 에러 안내 화면으로 보내기
  if(is_rendered){
    if(reviewList.length === 0){
      localStorage.clear();
      history.push("*")
    }
  }

  // useEffect(() => {
  //   //처음 들어오면, 접속한 유저의 토큰을 보내기
  //   if(userId){
  //     socket.emit("token", `Bearer ${localStorage.getItem("token")}`)
  //   }
  // },[userId])


  //로딩이 되고나면, 네이게이션을 없애주기.
  useEffect(() => {
    dispatch(userActions.checkTreasureSV())
    dispatch(permitAction.showNav(true));
    if(reviewList.length <10){
      dispatch(reviewActions.getAllReviewSV());
    }
    setTimeout(() => {
      dispatch(permitAction.isLoading(false))
    }, 600);
    return() => {
    dispatch(permitAction.showEditModal(false));
    }
  }, []);


  //인피니티 스크롤 구현을 위한, 리뷰 아이디 갯수 세기
  useEffect(() => {
    setId(reviewList)
  }, [reviewList]);

  //infinite scroll
  useEffect(() => {
    if(inView){
      console.log("화면에 들어왔다.")
      const lastReviewId = Id[Id.length - 1]?._id
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
      // dispatch(reviewActions.saveCurrentScroll(e.target.scrollTop))
    }, 500);
  
  }
  const scrollToTop = () => {
    container.current.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }
<<<<<<< refs/remotes/upstream/develop
  const lastScroll = useSelector(state=> state.review.current_scroll);
=======
  
  console.log()

>>>>>>> [추가] 게시물 별 유저 읽음 확인
  const container = useRef(null);

  useEffect(()=>{
      container?.current?.scrollTo(0, lastScroll);
  },[])

//-----------옵저버 테스트 

const target = useRef(null);
const onIntersect = async([entry], observer) => {
  console.log("화면에 들어왔다.")
}

useEffect(() => {
    if(elRefs[9]){
    console.log(elRefs[6].current)
    const observer = new IntersectionObserver(onIntersect, {threshold: 0.5});
    reviewList.forEach((_, idx) => {
      observer.observe(elRefs[idx].current)
    });
  }
},[elRefs])


  //뷰


  return (
    <>
{is_loading ? <Loading/> : <Container  onScroll={scroll} ref={container}>
        <Header />
        
        <FeedCategoryWrapper>
          <SocialFeed 
          onClick={() => setIsRecentCategory(false)} 
          isRecentCategory={isRecentCategory}>
            소셜피드
          </SocialFeed>
          <RecentFeed 
          onClick={() => setIsRecentCategory(true)}
          isRecentCategory={isRecentCategory}>
            최신피드
          </RecentFeed>
          <CategoryBar isRecentCategory={isRecentCategory}/>
        </FeedCategoryWrapper>

        {/* <GoToTopBtn onClick={()=>{scrollToTop()}}/> */}
        {reviewList?.map((review, idx) => {
              return (
                    <ReviewCard
                    setRef={elRefs[idx]}
                    {...review}
                    key={review.id}/> 
              );
        })}

      <div ref={ref}></div>
    </Container>}
    <NotSupport is_support_modal={is_support_modal}/>
    <EditModal is_edit_modal={is_edit_modal}/>
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
bottom:0px;
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
  background: ${Color.bgColor};
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
//import 부분
import React, { useEffect, useState, useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as permitAction } from "../redux/modules/permit";
import { actionCreators as reviewActions } from "../redux/modules/review";
import { useInView } from "react-intersection-observer";

import styled from "styled-components";
import ReviewCard from "../components/ReviewCard";
import AddIcon from "@material-ui/icons/Add";
import Header from "../components/Header";
import EditModal from "../modals/EditModal";
import LoginModal from "../modals/LoginModal";

const Home = (props) => {
  //dispatch와 변수들
  const dispatch = useDispatch();
  const reviewList = useSelector((state) => state.review.all_review_list);
  const is_modal = useSelector((state) => state.permit.is_modal);
  const show_login_modal = useSelector((state) => state.permit.show_login)
  const [Id, setId] = useState([])
  const [ref, inView] = useInView();
  const getMoreReview = (lastId) => {
    if(lastId) return dispatch(reviewActions.getMoreReviewSV(lastId));
  }

  //로딩이 되고나면, 네이게이션을 없애주기.
  useEffect(() => {
    dispatch(permitAction.showNav(true));
    dispatch(reviewActions.getAllReviewSV());
  }, []);

  useEffect(() => {
    setId(reviewList)
  }, [reviewList]);

  useEffect(() => {

    if(inView){
      const lastReviewId = Id[Id.length - 1]?._id
      getMoreReview(lastReviewId)
    }
  }, [inView]);


  return (
    <React.Fragment>
      <HomeBGColor>
        <Header />
 
        {reviewList?.map((review) => {
              return (
                <React.Fragment key={review.id}>
                    <ReviewCard {...review} /> 
                </React.Fragment>
              );
        })}

      <div ref={ref}></div>
      </HomeBGColor>

      {is_modal && <EditModal />}
      {show_login_modal && <LoginModal/>}
    </React.Fragment>
  );
};

const HomeBGColor = styled.div`
  background-color: #f5f5f5;
  box-sizing: border-box;
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 15vh 0 0 0;
`;


export default Home;

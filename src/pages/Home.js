//import 부분
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as permitAction } from "../redux/modules/permit";
import { actionCreators as reviewActions } from "../redux/modules/review";
import styled from "styled-components";
import ReviewCard from "../components/ReviewCard";
import AddIcon from "@material-ui/icons/Add";

import Header from "../components/Header";
import EditModal from "../modals/EditModal";

const Home = (props) => {
    //dispatch와 변수들
    const dispatch = useDispatch();
    const is_modal = useSelector((state) => state.permit.is_modal);

    //로딩이 되고나면, 네이게이션을 없애주기.
    useEffect(() => {
        dispatch(permitAction.showNav(true));
        dispatch(reviewActions.getAllReviewSV());
    }, []);

    const reviewList = useSelector((state) => state.review.all_review_list);
    console.log(reviewList)

    return (
        <React.Fragment>
            <HomeBackGroundColor>
                <Header />

                {reviewList
                    ? reviewList.map((review, idx) => {
                        return (
                            <React.Fragment key={review._id}>
                                <ReviewCard {...review} />
                            </React.Fragment>
                        );
                    })
                    : ""}
            </HomeBackGroundColor>

   
      {is_modal && <EditModal />}
    </React.Fragment>
  );
};

const HomeBackGroundColor = styled.div`
  background-color: #f5f5f5;
  box-sizing: border-box;
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 15px 0px;
`;

const FloatButton = styled.div`
  width: 56px;
  height: 56px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 12px;
  background-color: #1168d7;
  position: fixed;
  right: 16px;
  bottom: 72px;
`;

export default Home;
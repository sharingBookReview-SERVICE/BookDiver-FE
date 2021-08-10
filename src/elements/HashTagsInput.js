import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ClearIcon from "@material-ui/icons/Clear";
import CancelIcon from '@material-ui/icons/Cancel';

import { useSelector,useDispatch } from "react-redux";
import ReviewDetail from "../pages/ReviewDetail";
import Color from "../shared/Color";
import { makeStyles } from "@material-ui/core/styles";
import { actionCreators as tagActions } from "../redux/modules/tag";

const useStyles = makeStyles((theme) => ({
  close: {
    color:Color.gray,
    fontSize:"16px",
  },
}));


const HashTagsInput = (props) => {
  const dispatch = useDispatch()
  const classes = useStyles();
  const { is_edit, defaultValue } = props;
  const review_detail = useSelector((state) => state.review.review_detail);
  const tags = useSelector(state => state.tag.tags)


  //해쉬태그 지우기
  const removeTags = (indexToRemove) => {
    //파라미터로 들어온 idx를 제외한 태그를 setTags에 넣어주기
    dispatch(tagActions.removeTag(indexToRemove))
  };

  //해쉬태그 추가하기
  const addTags = (event) => {
    if (event.target.value !== "") {
      dispatch(tagActions.addTag([...tags, event.target.value]))
      event.target.value = "";
    }
  };

  useEffect(() => {
    //is_edit이 true이면, defaultValue의 값들을 tag에 넣어주기
    if (is_edit) {
      dispatch(tagActions.getTag(defaultValue));
    }
  }, [review_detail]);

  return (
    <TagBox>
      <TagUl>
        {tags.map((tag, index) => (
          <Tag key={index}>
            <TagText>{tag}</TagText>
            <CancelIcon 
            className={classes.close}
            onClick={() => removeTags(index)}></CancelIcon>
          </Tag>
        ))}
      </TagUl>
      <TagInput
        type="text"
        onKeyUp={(e) => (e.key === "Enter" ? addTags(e) : null)}
        placeholder="해쉬태그를 입력해주세요"
      />
    </TagBox>
  );
};

export default HashTagsInput;

const TagBox = styled.div`
  box-sizing: border-box;
  width: 100%;
  min-height: 48px;
  border-radius: 8px;
  border:1px solid ${Color.borderGray};
  position: relative;
  margin: 5px 0px 5px 0px;
  padding: 0 8px;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
`;

const TagUl = styled.ul`
  display: flex;
  flex-wrap: wrap;
  padding: 0;
  margin: 8px 0 0 0;
`;

const Tag = styled.li`
  display: flex;
  align-items: center;
  padding: 5px;
  background-color: ${Color.hashtag};
  border-radius: 7px;
  border: 1px solid ${Color.black};
  width: auto;
  height: 20px;
  margin-right: 5px;
  margin-bottom: 5px;
`;

const TagText = styled.span`
  font-size: 14px;
  color: ${Color.black};
  margin-right:2px;
`;

const TagInput = styled.input`
  flex: 1;
  border: none;
  background-color: transparent;
  height: 46px;
  font-size: 14px;
  &:focus {
    outline: transparent;
  }
`;

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ClearIcon from "@material-ui/icons/Clear";

import { useSelector } from "react-redux";
import ReviewDetail from "../pages/ReviewDetail";
import Color from "../shared/Color";

const HashTagsInput = (props) => {
  // 수정화면일 때, 사용할 변수들
  const { is_edit, defaultValue } = props;
  const review_detail = useSelector((state) => state.review.review_detail);

  //화면에 뿌릴 해쉬태그
  const [tags, setTags] = useState(["ex) 자기계발"]);

  //해쉬태그 지우기
  const removeTags = (indexToRemove) => {
    //파라미터로 들어온 idx를 제외한 태그를 setTags에 넣어주기
    setTags(tags.filter((_, index) => index !== indexToRemove));
    props.getTags(tags.filter((_, index) => index !== indexToRemove));
  };

  //해쉬태그 추가하기
  const addTags = (event) => {
    if (event.target.value !== "") {
      setTags([...tags, event.target.value]);
      props.getTags([...tags, event.target.value]);
      event.target.value = "";
    }
  };

  useEffect(() => {
    //is_edit이 true이면, defaultValue의 값들을 tag에 넣어주기
    if (is_edit) {
      setTags(defaultValue);
    }
  }, [review_detail]);

  return (
    <TagBox>
      <TagUl>
        {tags.map((tag, index) => (
          <Tag key={index}>
            <TagText onClick={() => removeTags(index)}>{tag}</TagText>
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
  margin: 5px 0px 60px 0px;
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

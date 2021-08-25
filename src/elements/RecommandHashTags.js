import React from "react";
import styled from "styled-components";
import Color from "../shared/Color";

import { actionCreators as tagActions } from "../redux/modules/tag";
import { useDispatch, useSelector } from 'react-redux';



const RecommandHashTags = (props) => {
  const dispatch = useDispatch()

  const tags = useSelector(state => state.tag.recommand_tags)

  //화면에 뿌릴 해쉬태그

  //해쉬태그 지우기
  const removeTag = (indexToRemove) => {
    //파라미터로 들어온 idx를 제외한 태그를 setTags에 넣어주기
    dispatch(tagActions.removeRecommandTag(indexToRemove))
  };

  const addTag = (tag) => {
    dispatch(tagActions.addTag(tag))
  }


  return (
    <TagBox>
      <TagUl>
        {tags?.map((tag, index) => (
          <Tag 
          key={index}
          onClick={()=>{
            addTag(tag);
            removeTag(index);
          }}>
            <TagText>{tag}</TagText>
          </Tag>
        ))}
      </TagUl>
    </TagBox>
  );
};

export default RecommandHashTags;

const TagBox = styled.div`
  box-sizing: border-box;
  width: 100%;
  min-height: 48px;
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
  background-color: ${Color.mainColor};
  border-radius: 7px;
  border: 1px solid ${Color.secondColor};
  width: auto;
  height: 20px;
  margin-right: 5px;
  margin-bottom: 5px;
  :hover{
    background-color: ${Color.secondColor};
    span{
      color:white;
    }
  }
`;

const TagText = styled.span`
  font-size: 14px;
  color: ${Color.secondColor};
  margin-right:2px;
`;


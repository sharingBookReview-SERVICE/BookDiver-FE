import React from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { actionCreators as permitActions } from "../../redux/modules/permit";

import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from "@material-ui/core/styles";
import Color from "../../shared/Color";


//스타일 정의
const useStyles = makeStyles((theme) => ({
 
    font: {
        fontWeight:"bold",
        fontSize:"1rem"

    },
    addicon: {
        fontSize: "40px"
    }
  }));



//책 추가하기 컴포넌트
const AddBook = (props) =>{
    const classes = useStyles();
    const dispatch = useDispatch();

    const showSelectBookModal = ()=>{
        dispatch(permitActions.showModal(true));
    }
    return(
        <AddBookBox onClick={()=>{showSelectBookModal()}}>
        <AddIcon className={classes.addicon}/>
        <Notice className={classes.font}>추가할 책 선택하기</Notice>
        </AddBookBox>
    )
}

const AddBookBox= styled.div`
width: 100%;
height: 112px;
border-top: 1px solid ${Color.bgColor};
border-bottom: 1px solid ${Color.bgColor};
box-sizing: border-box;
margin-bottom: 16px;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
cursor:pointer;
`;

const Notice = styled.div`
`;

export default AddBook;
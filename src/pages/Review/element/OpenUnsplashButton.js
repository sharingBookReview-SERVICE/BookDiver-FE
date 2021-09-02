import styled from "styled-components"
import Color from "../../../shared/Color"
import { useDispatch } from "react-redux";
import { actionCreators as permitActions } from "../../../redux/modules/permit"

const OpenUnsplashButton = () => {
    const dispatch = useDispatch();

    const openModal = () => {
        dispatch(permitActions.isUnsplashModal(true))
    }
  
    return (
      <UnsplashButtonBox onClick={openModal}>
        사진이 없다면?
      </UnsplashButtonBox>
    )
  }
  
  export default OpenUnsplashButton;
  
  const UnsplashButtonBox = styled.div`
  padding:7px 10px;
  top:10px;
  left:10px;
  display:flex;
  justify-content:center;
  align-items:center;
  position:absolute;
  border:1px solid ${Color.line};
  transition:0.4s ease-in-out;
  
  :hover{
    background:${Color.line};
  }
  cursor:pointer;
  `
  
  const UnsplashButton = styled.img`
  width:auto;
  height:auto;
  max-width:90px;
  max-height:90px;
  `
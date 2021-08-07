import { createGlobalStyle } from "styled-components";
import Color from "./Color";

const GlobalStyle = createGlobalStyle`
  
body{
    font-family: 'Noto Sans KR', sans-serif;
    font-weight:400;
    background-color:${Color.mainColor}
}
`;

export default GlobalStyle;

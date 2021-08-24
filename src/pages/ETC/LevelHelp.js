import React from "react";
import styled from "styled-components";

import { history } from "../../redux/configStore";

import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import { makeStyles } from "@material-ui/core/styles";
import Color from "../../shared/Color";

const useStyles = makeStyles((theme) => ({
    goback: {
        padding: "0px 20px"
    },
    icon: {
        position: "absolute",
        right: "20px"
    }
  }));

//도움말 하나
const Slide = (props) => {
    const classes = useStyles();
    return (
        <Wrapper>
              <Head>
                <ArrowBackIcon className={classes.goback}
                onClick = {()=>{history.push('/mydepth')}}
                />
                <Text>도움말</Text>
             </Head>
             <Guide>{props.quide}</Guide>
            <IMG url={props.img} />
               
        </Wrapper>
        
    );
  }
 
const TOTAL_SLIDES = 3;
const LevelHelp = (props) =>{
    const [currentSlide, setCurrentSlide] = React.useState(0);
    const slideRef = React.useRef(null);

    React.useEffect(() => {
        slideRef.current.style.transition = "all 0.5s ease-in-out";
        slideRef.current.style.transform = `translateX(-${currentSlide}00%)`; // 백틱을 사용하여 슬라이드로 이동하는 애니메이션을 만듭니다.
      }, [currentSlide]);

    const nextSlide = () => {
        if (currentSlide >= TOTAL_SLIDES) { // 더 이상 넘어갈 슬라이드가 없으면 슬라이드를 초기화합니다.
          setCurrentSlide(0);
        } else {
          setCurrentSlide(currentSlide + 1);
        }
      };
      const prevSlide = () => {
        if (currentSlide === 0) {
          setCurrentSlide(TOTAL_SLIDES);
        } else {
          setCurrentSlide(currentSlide - 1);
        }
      };

    const goToMyDepth = ()=>{
      history.push('/mydepth')
    }

    const slideContent = [
        {
        img: "https://booknetworkservice.s3.ap-northeast-2.amazonaws.com/onboarding/M.%E1%84%85%E1%85%A6%E1%84%87%E1%85%A6%E1%86%AF%E1%84%89%E1%85%B5%E1%84%89%E1%85%B3%E1%84%90%E1%85%A6%E1%86%B7-%E1%84%8B%E1%85%A9%E1%86%AB%E1%84%87%E1%85%A9%E1%84%83%E1%85%B5%E1%86%BC-01.png" ,
        quide:`수심이 깊어질 수록
         더 다양한 해양생물을 만날 수 있어요`
        },
        {
        img: "https://booknetworkservice.s3.ap-northeast-2.amazonaws.com/onboarding/M.%E1%84%85%E1%85%A6%E1%84%87%E1%85%A6%E1%86%AF%E1%84%89%E1%85%B5%E1%84%89%E1%85%B3%E1%84%90%E1%85%A6%E1%86%B7-%E1%84%8B%E1%85%A9%E1%86%AB%E1%84%87%E1%85%A9%E1%84%83%E1%85%B5%E1%86%BC-02.png" ,
        quide:"게시글 작성이나 북 컬렉션 제작, 댓글 및 좋아요 를 통해 더 깊게 수영할 수 있어요."
        },
        {
        img: "https://booknetworkservice.s3.ap-northeast-2.amazonaws.com/onboarding/M.%E1%84%85%E1%85%A6%E1%84%87%E1%85%A6%E1%86%AF%E1%84%89%E1%85%B5%E1%84%89%E1%85%B3%E1%84%90%E1%85%A6%E1%86%B7-%E1%84%8B%E1%85%A9%E1%86%AB%E1%84%87%E1%85%A9%E1%84%83%E1%85%B5%E1%86%BC-03.png" ,
        quide:"10m마다 놓여진 보물상자 속에는 다양한 해양생물로 이루어진 프로필 아이콘들이 기다리고 있어요 :)"
        },
        {
        img: "https://booknetworkservice.s3.ap-northeast-2.amazonaws.com/onboarding/M.%E1%84%85%E1%85%A6%E1%84%87%E1%85%A6%E1%86%AF%E1%84%89%E1%85%B5%E1%84%89%E1%85%B3%E1%84%90%E1%85%A6%E1%86%B7-%E1%84%8B%E1%85%A9%E1%86%AB%E1%84%87%E1%85%A9%E1%84%83%E1%85%B5%E1%86%BC-04.png" ,
        quide:"그러면 이제 생각의 바다 속으로 풍덩!"
        },

    ];

    return(
        <Container>
            <SliderContainer ref={slideRef}>
                {
                    slideContent.map((p,idx)=>{
                        return(<Slide key={idx} {...p}/>)
                    })
                }
               
            </SliderContainer>
            {
                currentSlide > 0 &&<PrevBtn onClick={prevSlide}> <ArrowBackIcon/> 이전</PrevBtn>
            }
            {
                currentSlide < 3?
                <NextBtn onClick={nextSlide}>다음  <ArrowForwardIcon/> </NextBtn>
                :
                <FinishBtn onClick={()=>{goToMyDepth()}}>내잠수상태</FinishBtn>
            }
            
          
    </Container>
    )
}



const Wrapper = styled.div`
width: 100%;
`;
const Head = styled.div`
width: 100%;
height: 56px;
align-items: center;
display: flex;
position: fixed;
z-index: 100;
background: ${Color.black};
color: ${Color.white};
`;
const IMG = styled.div`
background-image:url(${(props) => props.url});
background-size:cover;
background-position:center;
height: 100vh;
width: 420px;
`;
const Text = styled.div`
width: 70%;
text-align: center;
`;

const Guide = styled.div`
width: 90%;
height:100px;
background: ${Color.black};
position: absolute;
border-radius: 24px;
margin-left: 5%;
top: 60%;
color: white;
display: flex;
align-items: center;
text-align: center;
justify-content: center;
z-index: 100;
`;
const Container = styled.div`
  width: 100%;
  overflow: hidden; // 선을 넘어간 이미지들은 보이지 않도록 처리합니다.
`;
const PrevBtn = styled.button`
all: unset;
background: ${Color.black};
border: 1px solid ${Color.white};
padding: 0.5em 2em;
color: ${Color.white};
border-radius: 10px;
position: absolute;
bottom: 100px;
left: 5%;
height: 5%;
padding: 10px 30px;
text-align: center;
display: flex;
justify-content: center;
align-items: center;
cursor:pointer;
`;
const NextBtn = styled.button`
all: unset;
background: white;
padding: 0.5em 2em;
color: black;
border-radius: 10px;
position: absolute;
bottom: 100px;
right: 5%;
height: 5%;
padding: 10px 30px;
text-align: center;
display: flex;
justify-content: center;
align-items: center;
cursor:pointer;
`;
const FinishBtn = styled.button`
all: unset;
background: white;
padding: 0.5em 2em;
color: black;
border-radius: 10px;
position: absolute;
bottom: 100px;
right: 5%;
height: 5%;
padding: 10px 30px;
text-align: center;
cursor:pointer;
`;
const SliderContainer = styled.div`
  width: 100%;
  display: flex; //이미지들을 가로로 나열합니다.
`;
export default LevelHelp;
import styled from "styled-components"
import React from "react"
import { history } from "../../redux/configStore"
import { useDispatch } from "react-redux"

import ArrowBackIcon from "@material-ui/icons/ArrowBack"
import ArrowForwardIcon from "@material-ui/icons/ArrowForward"
import { actionCreators as permitActions } from "../../redux/modules/permit"
import Color from "../../shared/Color"

//도움말 하나
const Slide = props => {
  return (
    <Wrapper>
      <Guide position={props?.position}>{props.quide}</Guide>
      <IMG url={props.img} />
    </Wrapper>
  )
}

const TOTAL_SLIDES = 5
const LevelHelp = props => {
  const dispatch = useDispatch()
  const [currentSlide, setCurrentSlide] = React.useState(0)
  const slideRef = React.useRef(null)

  React.useEffect(() => {
    slideRef.current.style.transition = "all 0.5s ease-in-out"
    slideRef.current.style.transform = `translateX(-${currentSlide}00%)` // 백틱을 사용하여 슬라이드로 이동하는 애니메이션을 만듭니다.
  }, [currentSlide])

  React.useEffect(() => {
    dispatch(permitActions.showNav(false))
    dispatch(permitActions.isPadding(false))
  }, [dispatch])

  const nextSlide = () => {
    if (currentSlide >= TOTAL_SLIDES) {
      // 더 이상 넘어갈 슬라이드가 없으면 슬라이드를 초기화합니다.
      setCurrentSlide(0)
    } else {
      setCurrentSlide(currentSlide + 1)
    }
  }
  const prevSlide = () => {
    if (currentSlide === 0) {
      setCurrentSlide(TOTAL_SLIDES)
    } else {
      setCurrentSlide(currentSlide - 1)
    }
  }

  const goToMyDepth = () => {
    history.push("/mydepth")
  }

  const slideContent = [
    {
      img: "https://booknetworkservice.s3.ap-northeast-2.amazonaws.com/%E1%84%90%E1%85%B2%E1%84%90%E1%85%A9%E1%84%85%E1%85%B5%E1%84%8B%E1%85%A5%E1%86%AF-%E1%84%87%E1%85%A2%E1%84%80%E1%85%A7%E1%86%BC%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5/%E1%84%90%E1%85%B2%E1%84%90%E1%85%A9%E1%84%85%E1%85%B5%E1%84%8B%E1%85%A5%E1%86%AF-1.png",
      quide: `안녕하세요, 다이버가 처음이신가요?
        다이버에서는 잠수상태에 따라서 
        다양한 바다친구들을 만나며
        더욱 재미있게  독서의 바다에서 헤엄칠 수 있어요.`,
    },
    {
      img: "https://booknetworkservice.s3.ap-northeast-2.amazonaws.com/%E1%84%90%E1%85%B2%E1%84%90%E1%85%A9%E1%84%85%E1%85%B5%E1%84%8B%E1%85%A5%E1%86%AF-%E1%84%87%E1%85%A2%E1%84%80%E1%85%A7%E1%86%BC%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5/%E1%84%90%E1%85%B2%E1%84%90%E1%85%A9%E1%84%85%E1%85%B5%E1%84%8B%E1%85%A5%E1%86%AF-2.png",
      quide:
        "다이버들은  게시물을 올리거나 북컬렉션을 만들면 더욱 깊은 곳으로 잠수할 수 있어요.",
    },
    {
      img: "https://booknetworkservice.s3.ap-northeast-2.amazonaws.com/%E1%84%90%E1%85%B2%E1%84%90%E1%85%A9%E1%84%85%E1%85%B5%E1%84%8B%E1%85%A5%E1%86%AF-%E1%84%87%E1%85%A2%E1%84%80%E1%85%A7%E1%86%BC%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5/%E1%84%90%E1%85%B2%E1%84%90%E1%85%A9%E1%84%85%E1%85%B5%E1%84%8B%E1%85%A5%E1%86%AF-3.png",
      quide:
        "깊은 곳으로 잠수하면 다양한 바닷속 친구들과 보물상자를 발견할 수 있어요.",
    },
    {
      img: "https://booknetworkservice.s3.ap-northeast-2.amazonaws.com/%E1%84%90%E1%85%B2%E1%84%90%E1%85%A9%E1%84%85%E1%85%B5%E1%84%8B%E1%85%A5%E1%86%AF-%E1%84%87%E1%85%A2%E1%84%80%E1%85%A7%E1%86%BC%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5/%E1%84%90%E1%85%B2%E1%84%90%E1%85%A9%E1%84%85%E1%85%B5%E1%84%8B%E1%85%A5%E1%86%AF-4.png",
      quide:
        "보물상자를 열면 바다속 친구를 칭호로 얻을 수 있고, 칭호를 내 프로필에 적용할 수 있어요.",
      position: "8%",
    },
    {
      img: "https://booknetworkservice.s3.ap-northeast-2.amazonaws.com/%E1%84%90%E1%85%B2%E1%84%90%E1%85%A9%E1%84%85%E1%85%B5%E1%84%8B%E1%85%A5%E1%86%AF-%E1%84%87%E1%85%A2%E1%84%80%E1%85%A7%E1%86%BC%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5/%E1%84%90%E1%85%B2%E1%84%90%E1%85%A9%E1%84%85%E1%85%B5%E1%84%8B%E1%85%A5%E1%86%AF-5.png",
      quide:
        "획득한 칭호가 궁금하다면 언제든지 내피드 상단 톱니바퀴를 누르고 프로필 변경 페이지로 이동하면 확인할 수 있어요",
    },
    {
      img: "https://booknetworkservice.s3.ap-northeast-2.amazonaws.com/%E1%84%90%E1%85%B2%E1%84%90%E1%85%A9%E1%84%85%E1%85%B5%E1%84%8B%E1%85%A5%E1%86%AF-%E1%84%87%E1%85%A2%E1%84%80%E1%85%A7%E1%86%BC%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5/%E1%84%90%E1%85%B2%E1%84%90%E1%85%A9%E1%84%85%E1%85%B5%E1%84%8B%E1%85%A5%E1%86%AF-6.png",
      quide:
        "성격과 취향이 다른 바닷속 친구들을 내 프로필로 적용해 나의 모습을 표현해보세요! 그럼, 이제 잠수하러 떠나볼까요?",
    },
  ]

  return (
    <Container>
      <SliderContainer ref={slideRef}>
        {slideContent.map((p, idx) => {
          return <Slide key={idx} {...p} />
        })}
      </SliderContainer>
      {currentSlide === 0 && (
        <div>
          <HowToBtn onClick={nextSlide}>
            어떻게 쓸 수 있나요?
            <ArrowForwardIcon />
          </HowToBtn>
          <SkipBtn
            onClick={() => {
              goToMyDepth()
            }}
          >
            건너띄고 바로 내 상태 확인하기
            <ArrowForwardIcon />
          </SkipBtn>
        </div>
      )}

      {currentSlide < 5 && currentSlide > 0 && (
        <div>
          <NextBtn onClick={nextSlide}>
            다음 <ArrowForwardIcon />{" "}
          </NextBtn>
          <PrevBtn onClick={prevSlide}>
            {" "}
            <ArrowBackIcon /> 이전
          </PrevBtn>
        </div>
      )}
      {currentSlide === 5 && (
        <FinishBtn
          onClick={() => {
            goToMyDepth()
          }}
        >
          내 잠수상태 확인하기
          <ArrowForwardIcon />
        </FinishBtn>
      )}
    </Container>
  )
}

const Wrapper = styled.div`
  width: 100%;
`
const IMG = styled.div`
  background-image: url(${props => props.url});
  background-size: cover;
  background-position: center;
  height: 120vh;
  width: 100vw;
  @media ${props => props.theme.tablet} {
    width: 420px;
    height: 150vh;
  }

  @media ${props => props.theme.desktop} {
    width: 420px;
    height: 100vh;
  }
`

const Guide = styled.div`
  width: 80%;
  height: 100px;
  position: absolute;
  margin-left: 10%;
  top: ${props => (props.position ? `${props.position};` : "40%;")};
  color: white;
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
  z-index: 100;
  @media ${props => props.theme.tablet} {
    top: ${props => (props.position ? `${props.position};` : "30%;")};
  }

  @media ${props => props.theme.desktop} {
  }
`
const Container = styled.div`
  width: 100%;
  overflow-x: hidden; // 선을 넘어간 이미지들은 보이지 않도록 처리합니다.
`
const HowToBtn = styled.button`
  all: unset;
  background: ${Color.white};
  padding: 0.5em 2em;
  color: ${Color.black};
  border-radius: 12px;
  position: absolute;
  bottom: 20%;
  left: 12%;
  height: 5%;
  width: 60%;
  padding: 10px 30px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-size: 14px;
  @media ${props => props.theme.tablet} {
    font-size: 16px;
  }

  @media ${props => props.theme.desktop} {
    font-size: 16px;
  }
`
const SkipBtn = styled.button`
  all: unset;
  border: 1px solid ${Color.white};
  padding: 0.5em 2em;
  color: ${Color.white};
  border-radius: 12px;
  position: absolute;
  bottom: 10%;
  left: 12%;
  height: 5%;
  width: 60%;
  padding: 10px 30px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-size: 14px;
  @media ${props => props.theme.tablet} {
    font-size: 16px;
  }

  @media ${props => props.theme.desktop} {
    font-size: 16px;
  }
`
const PrevBtn = styled.button`
  all: unset;
  border: 1px solid ${Color.white};
  padding: 0.5em 2em;
  color: ${Color.white};
  border-radius: 10px;
  position: absolute;
  bottom: 10%;
  left: 5%;
  height: 5%;
  padding: 10px 30px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-size: 14px;
  @media ${props => props.theme.tablet} {
    font-size: 16px;
  }

  @media ${props => props.theme.desktop} {
    font-size: 16px;
  }
`
const NextBtn = styled.button`
  all: unset;
  background: white;
  padding: 0.5em 2em;
  color: black;
  border-radius: 10px;
  position: absolute;
  bottom: 10%;
  right: 5%;
  height: 5%;
  padding: 10px 30px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-size: 14px;
  @media ${props => props.theme.tablet} {
    font-size: 16px;
  }

  @media ${props => props.theme.desktop} {
    font-size: 16px;
  }
`
const FinishBtn = styled.button`
  all: unset;
  background: ${Color.white};
  padding: 0.5em 2em;
  color: ${Color.black};
  border-radius: 12px;
  position: absolute;
  bottom: 10%;
  left: 12%;
  height: 5%;
  width: 60%;
  padding: 10px 30px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-size: 14px;
  @media ${props => props.theme.tablet} {
    font-size: 16px;
  }

  @media ${props => props.theme.desktop} {
    font-size: 16px;
  }
`
const SliderContainer = styled.div`
  width: 100%;
  display: flex; //이미지들을 가로로 나열합니다.
`
export default LevelHelp

import React, { useRef, useEffect } from "react"
import styled from "styled-components"
import Color from "../../../shared/Color"
import { history } from "../../../redux/configStore"
import { useSelector } from "react-redux"

//이미지 슬라이드에 있는 한개의 컬렉션
const Collection = props => {
  const is_login = useSelector(state => state.user.is_login)

  const observeImage = useRef(null)

  const showImage = async ([entry], observer) => {
    if (!entry.isIntersecting) {
      return
    }
    const imageUrl = [entry][0].target.dataset.src //보여진 리뷰의 인덱스
    observeImage.current.src = imageUrl
    observer.unobserve(entry.target) // 함수가 실행될 때, 관찰을 끝내기.
  }

  useEffect(() => {
    const observer = new IntersectionObserver(showImage, { threshold: 0.1 }) //메인이미지 관찰
    observer.observe(observeImage.current)
    return () => {
      observer.disconnect()
    }
  }, [])
  return (
    <Outter
      onClick={() => {
        is_login
          ? history.push(`/collectiondetail/${props.id}`)
          : history.push("/login")
      }}
    >
      <ImgCover>
        <CollectionTitle>
          {props.is_tag ? `# ${props.name}` : `${props.name}`}
        </CollectionTitle>
        <Image data-src={props.image} ref={observeImage} />
      </ImgCover>
    </Outter>
  )
}

Collection.defaultProps = {
  image:
    "https://i.pinimg.com/564x/c0/79/44/c07944cff5a97bfa3274236cabee29c7.jpg",
}

const Outter = styled.div`
  width: auto;
  height: auto;
  box-sizing: border-box;
  cursor: pointer;
`

const ImgCover = styled.div`
  width: 180px;
  height: 180px;
  border-radius: 12px;
  overflow: hidden;
  background: ${Color.gray};
  position: relative;
`

const Image = styled.img`
  width: 180px;
  height: 180px;
  border-radius: 12px;
  // background-image:URL( ${props => props.url});
  background-size: cover;
  transition: 0.5s ease-in-out;
  filter: brightness(60%);

  :hover {
    transform: scale(1.1);
  }
`

const CollectionTitle = styled.p`
  color: ${Color.white};
  margin: 0px;
  text-align: center;
  position: absolute;
  z-index: 100;
  width: 160px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`

export default Collection

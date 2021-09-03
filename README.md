# Diver(책 리뷰 공유 sns)📘
> 안녕하세요! 인상깊은 책의 구절을 사람들과 공유하고, 책으로 소통할 수 있는 sns 다이버입니다.<br>
> 책 읽는 것을 좋아하고<br>
>  다른사람과 읽은 책에 대해 이야기 나눌 수 있는 플랫폼이 없어서 아쉬웠던 분들을 위한 서비스입니다. <br>
[ bookdiver.net](https:www.bookdiver.net/)

<br>
<br>

## 목차
 1. [팀원 소개 및 제작 기간](#팀원-소개-및-제작-기간)
 2. [프로젝트 소개](#프로젝트-소개)
 3. [사용 기술](#사용-기술)
 4. [아키텍쳐](#아키텍쳐)
 5. [협업 과정](#협업-과정)
 6. [저희 프론트엔드는](#저희-프론트엔드는)
 7. [기능소개/실행화면](#기능소개/-실행-화면)

<br>
<br>



## 팀원 소개 및 제작 기간


- 2021년 7월 23일 ~ 
- 7인 1조 팀프로젝트
  + 프론트엔드 (React) : 이현주, 노예찬
  + 백엔드 (Node.js) : 김승빈, 권오빈
  + 디자이너 : 조민정, 김언용, 곽은주
<br>
<br>

## 프로젝트 소개

![ezgif com-gif-maker](https://user-images.githubusercontent.com/70359952/131693331-1829bac8-6288-47be-bd28-a4c7cf06b0cb.gif)

<br>

* 책을 좋아하는 사람들이 읽은 책의 구절을 공유하고 책을 추천하면서
* 책을 중심으로 소통이 이루어지는 sns 서비스 입니다.

<span style="color:red">**직접 사용하러 가기**</span>[ bookdiver.net](https:www.bookdiver.net/)


<br>
<br>

## 사용 기술


`Front-end`
-  React
- javascript


`Back-end`
-  ([Backend Repository이동](https://github.com/sharingBookReview-SERVICE/sharingBookReview-BE))


`deploy`
- AWS S3 
- Route 53
- Cloud front
- https

<br>
<br>

##  아키텍쳐
<br>

> https 

<br>

![아키택쳐 (2)](https://user-images.githubusercontent.com/70359952/131849564-b83c4cbf-3b94-41ce-aff0-41974b8e777b.jpg)

<br>

##  협업 과정


- 전체 팁 협업 : `notion`
- 협업
	+ `Figma`, `zeplin`을 통하여 디자이너와 협업
	+ `swagger`을 이용하여 백엔드와 협업

- 구현   
	: 모든 작업은 다음과 같은 과정을 거쳤습니다.
	![깃허브 리드미](https://user-images.githubusercontent.com/70359952/131766461-81427882-4d77-4085-bf00-213e02d47558.PNG)
	

<br>
<br>

## 저희 프론트엔드는
<br>
- <b>깃 플로우를 사용했습니다.</b><br>
- <b>사용자 중심의 서비스를 만들기 위해 노력했습니다.</b><br>
- <b>서비스의 성능 최적화를 노력을 했습니다.</b><br>

 [페이지로 가기](https://github.com/sharingBookReview-SERVICE/sharingBookReview-FE/wiki/%ED%94%84%EB%A1%A0%ED%8A%B8%EC%97%94%EB%93%9C%EB%8A%94)

<br>
<br>

## 기능소개/ 실행 화면


[1. 로그인](https://github.com/sharingBookReview-SERVICE/sharingBookReview-FE/wiki/1.-%EB%A1%9C%EA%B7%B8%EC%9D%B8)
<br>
[2. 게시글 CRUD](https://github.com/sharingBookReview-SERVICE/sharingBookReview-FE/wiki/2.-%EA%B2%8C%EC%8B%9C%EA%B8%80-CRUD)
<br>
[3. SNS 기능](https://github.com/sharingBookReview-SERVICE/sharingBookReview-FE/wiki/3.-SNS-%EA%B8%B0%EB%8A%A5)
<br>
[4. 북컬렉션](https://github.com/sharingBookReview-SERVICE/sharingBookReview-FE/wiki/4.-%EB%B6%81%EC%BB%AC%EB%A0%89%EC%85%98)
<br>
[5. 레벨 시스템](https://github.com/sharingBookReview-SERVICE/sharingBookReview-FE/wiki/5.-%EB%A0%88%EB%B2%A8-%EC%8B%9C%EC%8A%A4%ED%85%9C)


<br>
<br>

## dependencies

<br>

 + "@material-ui/core": "^4.12.3" <br>
 +   "@material-ui/icons": "^4.11.2" <br>
 +   "@testing-library/jest-dom": "^5.11.4" <br>
 +   "@testing-library/react": "^11.1.0" <br>
 +   "@testing-library/user-event": "^12.1.10" <br>
 +   "axios": "^0.21.1" <br>
 +   "browser-image-compression": "^1.0.14" <br>
 +   "connected-react-router": "6.8.0" <br>
 +   "global": "^4.4.0" <br>
 +   "history": "4.10.1" <br>
 +   "immer": "^9.0.5" <br>
 +   "jwt-decode": "^3.1.2" <br>
 +   "lottie-web-light": "^1.1.0" <br>
 +   "react": "^17.0.2" <br>
 +   "react-dom": "^17.0.2" <br>
 +   "react-ga": "^3.3.0" <br>
 +   "react-intersection-observer": "^8.32.0" <br>
 +   "react-kakao-login": "^2.1.0" <br>
 +   "react-redux": "^7.2.4" <br>
 +   "react-router-dom": "^5.2.0" <br>
 +   "react-scripts": "^4.0.3" <br>
 +   "redux": "^4.1.0" <br>
 +   "redux-actions": "^2.6.5" <br>
 +   "redux-logger": "^3.0.6" <br>
 +   "redux-thunk": "^2.3.0" <br>
 +   "sass": "^1.37.5" <br>
 +   "socket.io-client": "^4.1.3" <br>
 +   "styled-components": "^5.3.0" <br>
 +   "swiper": "^6.8.1" <br>
 +   "web-vitals": "^1.0.1" <br>
 


<br>


## 트러블 슈팅


<br>

[트러블 슈팅](https://github.com/sharingBookReview-SERVICE/sharingBookReview-FE/wiki/%ED%8A%B8%EB%9F%AC%EB%B8%94-%EC%8A%88%ED%8C%85)



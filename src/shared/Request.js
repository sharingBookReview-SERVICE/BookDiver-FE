import axios from "axios";

const instance = axios.create({
  baseURL: "http://13.124.63.103/api", // 요청을 www.aa.com/user로 보낸다면, www.aa.com까지 기록
});

// 가지고 있는 토큰 넣어주기!
// 로그인 전이면 토큰이 없으니 못 넣어요.
// 그럴 땐 로그인 하고 토큰을 받아왔을 때 넣어줍시다.
instance.defaults.headers.common["authorization"] =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MTA5MzA5ZjdhNzY3MTRhYzQ3MDExYzciLCJpYXQiOjE2MjgwMDMwNjB9.ID1M_2FDMJEA6VGXbK2L3y3sdWwzEO62w3vynmqf-2M";

export default instance;

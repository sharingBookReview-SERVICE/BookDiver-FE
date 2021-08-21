import axios from "axios";

const instance = axios.create({
  baseURL: "http://13.209.10.67/api", // 요청을 www.aa.com/user로 보낸다면, www.aa.com까지 기록
});

const token = localStorage.getItem('token');

// 가지고 있는 토큰 넣어주기!
// 로그인 전이면 토큰이 없으니 못 넣어요.
// 그럴 땐 로그인 하고 토큰을 받아왔을 때 넣어줍시다.
// instance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
if(token){
  instance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

// localStorage.setItem("token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MTEwY2Q0OTE4NWU0YTg5NTBiMTQzMzciLCJuaWNrbmFtZSI6IkxFTyIsImlhdCI6MTYyOTQ1NDY5NCwiZXhwIjoxNjI5NTQxMDk0fQ.cqs7-2M8tHlFi18glSj-DCztVB16WPIr2HeRRVnR_tA")

export default instance;


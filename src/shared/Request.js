import axios from "axios";

const instance = axios.create({
  baseURL: "http://13.209.10.67/api", // 요청을 www.aa.com/user로 보낸다면, www.aa.com까지 기록
});

const token = localStorage.getItem('token');

//토큰이 있을때만 넣어주기 
if(token){
  instance.defaults.headers.common["Authorization"] = `Bearer ${token}` 
} 


// localStorage.setItem("token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MTEwY2Q0OTE4NWU0YTg5NTBiMTQzMzciLCJuaWNrbmFtZSI6IkxFTyIsImlhdCI6MTYyOTQ1NDY5NCwiZXhwIjoxNjI5NTQxMDk0fQ.cqs7-2M8tHlFi18glSj-DCztVB16WPIr2HeRRVnR_tA")

export default instance;


import axios from "axios";

const instance = axios.create({
  baseURL: "http://13.209.10.67/api", // 요청을 www.aa.com/user로 보낸다면, www.aa.com까지 기록
});

const token = localStorage.getItem('token');

// 가지고 있는 토큰 넣어주기!
// 로그인 전이면 토큰이 없으니 못 넣어요.
// 그럴 땐 로그인 하고 토큰을 받아왔을 때 넣어줍시다.
// instance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
instance.defaults.headers.common["Authorization"] = token ? `Bearer ${token}` : null;

<<<<<<< refs/remotes/upstream/develop
// localStorage.setItem("token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MTEwY2Q0OTE4NWU0YTg5NTBiMTQzMzciLCJuaWNrbmFtZSI6IkxFTyIsImlhdCI6MTYyOTAxMDIzNywiZXhwIjoxNjI5MDk2NjM3fQ.AfExgh7v8DFe53p0q2km7yx8_Gexe37NhJSpIjdbaOc")
=======
localStorage.setItem("token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MTEwY2Q0OTE4NWU0YTg5NTBiMTQzMzciLCJuaWNrbmFtZSI6IkxFTyIsImlhdCI6MTYyOTE4MjI4OSwiZXhwIjoxNjI5MjY4Njg5fQ.EfWJ0InE8lAAc3U83vwNph8k1xUJGz9u_DY4LVTIUo8")
>>>>>>> [추가] 리뷰 디테일 페이지 들어가기 댓글and 콘텐츠 클릭으로 분기하기

export default instance;


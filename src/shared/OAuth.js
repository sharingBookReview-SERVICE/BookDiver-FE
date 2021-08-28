//카카오
const CLIENT_ID = "89c020b3b307f237f8e3e3135ce353cf";
const REDIRECT_URI =  "https://ohbin.shop/api/users/kakao/callback";

export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;

//구글 로그인(보안)
const G_CLIENT_ID = "1055306612491-hic8bgcptl96tstmtgc48bj5dtk1oc81.apps.googleusercontent.com";
const G_REDIRECT_URI = "https://ohbin.shop/api/users/google/callback";

export const GOOGLE_AUTH_URL = `https://accounts.google.com/o/oauth2/v2/auth/oauthchooseaccount?response_type=code&redirect_uri=${G_REDIRECT_URI}&scope=email%20profile&client_id=${G_CLIENT_ID}&flowName=GeneralOAuthFlow`
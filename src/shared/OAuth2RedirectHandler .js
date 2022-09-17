import React from "react"
import { useDispatch } from "react-redux"
import { actionCreators as userActions } from "../redux/modules/user"

const OAuth2RedirectHandler = props => {
  const dispatch = useDispatch()

  // 인가코드
  let code = new URL(window.location.href).searchParams.get("code")

  React.useEffect(() => {
    dispatch(userActions.kakaoLoginSV(code))
  }, [code, dispatch])

  return <></>
}

export default OAuth2RedirectHandler

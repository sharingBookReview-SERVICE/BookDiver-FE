import { history } from "../redux/configStore";

export const goToHome = () => {
    history.push("/")
}

export const goToReviewDetail = (bookid, reviewid) => {
    history.push(`/reviewdetail/${bookid}/${reviewid}`)
}

export const goToPostWrite = () => {
    history.push("/postwrite")
}

export const goToPostEdit = (bookid, reviewid) => {
    history.push(`/postwrite/${bookid}/${reviewid}`)
}

export const goToBookDetail = (bookid) => {
    history.push(`/bookdetail/${bookid}`)
}
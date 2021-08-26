import React, { useEffect, useState, useRef, useCallback ,useMemo} from "react";
import styled from "styled-components";
import Color from "../../shared/Color";
import SearchIcon from "@material-ui/icons/Search";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as reviewActions } from "../../redux/modules/review";
import { actionCreators as bookActions} from "../../redux/modules/book";
import { actionCreators as searchActions } from "../../redux/modules/search";
import { Hint } from 'react-autocomplete-hint';
import SelectBookCard from "../../components/SelectBookCard";
import BookCard from "../../elements/BookCard";




const Search = (props)=>{
  const dispatch = useDispatch();
  const alltags = useSelector(state=> state.review.all_tags);
  const search_book_list = useSelector(state=> state.search.search_book_list);
  const [auto, setAutoComplete] = useState(false);
  const search_book_title = useSelector(state=> state.search.search_book_title);
  const text = useRef();
  
  useEffect(()=>{
    // dispatch(reviewActions.getAllTagsSV());
    return(
      dispatch(searchActions.resetSelectedBook())
    )
  },[])

  const searchBook = ()=>{
    dispatch(searchActions.getSearchBooksSV(text.current.value))
  }

  
  let timer;
  const search = ()=>{
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(function() {
      dispatch(searchActions.getSearchBooksSV(text.current.value))
      setAutoComplete(true)
    }, 1000);
  
  }
    return(
        <Container>
            <SearchBarBox >
            <SearchIcon />
            <Hint options={alltags} allowTabFill>
                <input 
                style={{
                  width: "290px",
                  height: "48px",
                  color: `${Color.gray}`,
                  border: "none",
                  borderRadius: "12px",
                  backgroundColor: `${Color.mainColor}`,
                  padding: "0px 0px 0px 10px"
                }}
                placeholder="책이름, 저자명 등으로 검색해보세요" 
                onKeyPress ={(e)=>{
                  if(e.key === "Enter"){
                    searchBook()
                    setAutoComplete(false)
                  }
                }}
                onChange = {(e)=>{
                  if(text.current.value.length >=2){
                    search()
                  }
                }}
                ref={text}
                />
            </Hint>
               
            </SearchBarBox>
            <Wrapper>
              {/* 자동완성부분 */}
            {
             auto && <Autocomplete>
              
              {
                search_book_title?.map((p)=> {
                  return(<Title 
                    key= {p?.isbn} 
                    dangerouslySetInnerHTML={{__html: p?.title.split("(")[0]}}
                    onClick={()=>{
                      text.current.value =p?.title.replace(/<(\/)?([a-zA-Z]*)(\s[a-zA-Z]*=[^>]*)?(\s)*(\/)?>/ig, "").split("(")[0] 
                      searchBook()
                      setAutoComplete(false)
                    }}
                    ></Title>)
                })
              }
             </Autocomplete>
           }

        {/* 책 나오는 부분 */}
        <Grid>
           {
             !auto && search_book_title?.map((p,idx)=>{
               return(<BookCard key={idx} {...p}></BookCard>)
             })
           }
            </Grid>
           </Wrapper>
        </Container>
    )
}


const Container = styled.div`
background: ${Color.mainColor};
width: 100%;
display: flex;
justify-content: center;
flex-direction: column;
align-items: center;
`;


const SearchBarBox = styled.div`
  width: 90%;
  height: 50px;
  border-bottom: 2px solid ${Color.gray};
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  background-color: ${Color.mainColor};
  margin-top: 20px;
`;

const SearchBar = styled.input`
  width: 100%;
  height: 48px;
  color: ${Color.gray};
  border: none;
  border-radius: 12px;
  background-color: ${Color.mainColor};
  :focus {
    outline: none;
  }
  ::placeholder {
    color: ${Color.gray};
  }
  padding: 0px 0px 0px 10px;
`;

const Autocomplete = styled.div`
width: 100%;
height: 500px;
padding-left: 20px;
`;


const Title = styled.div`
`;
const Wrapper = styled.div`
background:  ${Color.mainColor};
width: 100%;
min-height: 90vh;
height: 100%;
margin-top: 20px;
`;
const Grid = styled.div`
width: 100%;
height: 100%;
display: grid;
flex-direction: row;
grid-template-columns: 1fr 1fr 1fr;
`;

export default Search;
// import { actionCreators as uploadActions } from "../../redux/modules/upload";
// import { useDispatch } from "react-redux";

// const dispatch = useDispatch();

//   //업로드 버튼 클릭하기
//   const selectImage = (fileInput) => {
//     fileInput?.current.click();
//   };

// //이미지 가져오기
// const getImage = (event) => {
//     const reader = new FileReader();
//     const file = event.target.files[0];
//     actionImgCompress(file);

//     reader.readAsDataURL(file);
//     reader.onloadend = () => {
//     dispatch(uploadActions.showPreview(true));
//     dispatch(uploadActions.setPreview(reader.result));
//     };
// };
// //이미지 압축하기
// const actionImgCompress = async (fileSrc) => {
//     //압축할 옵션 내용
//     const options = {
//     maxSizeMB: 0.2,
//     maxWidthOrHeight: 1920,
//     useWebWorker: true,
//     };

//     try {
//     //imageCompression함수의 첫번째 인자는 파일, 두번째 인자는 옵션
//     const compressedFile = await imageCompression(fileSrc, options);
//     setCompressedImage(compressedFile);
//     } catch (error) {
//     console.log(error);
//     }
// };

//  //FormData로 변환하기
//  const sendFormData = async (image) => {
//     const formData = new FormData();
//     //formData에 압축 이미지, 인용구,내용,해쉬태그 저장
//     formData.append("image", image);
//     formData.append("name", title.current.value);
//     formData.append("description", description.current.value);
//     formData.append("contents", JSON.stringify(contents));

//     if (collection_book_list.length === 0) {
//         dispatch(permitActions.showCheckModal(true))
//         return;
//       } else if (!image) {
//         dispatch(permitActions.showCheckModal(true))
//         return;
//       }

//     await dispatch(collectionActions.addCollectionSV(formData));
 
// };
//   //이미지 보내기.
// const submit = async (event) => {
//     event.preventDefault();
//     await sendFormData(compressedImage);
// };
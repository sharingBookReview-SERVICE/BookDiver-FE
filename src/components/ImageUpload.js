import React, {useState} from 'react';
import  ImagePicker  from 'antd-mobile/lib/image-picker';
import imageCompression from 'browser-image-compression';

const ImageUpload = () => {
    const [data, setData] = useState({avatar:[],})

    const onClickImageUpload = (files, type, index) => {
        setData({...data, avatar: files,})
    }

    const onSubmit = async () => {
        actionImgCompress(data.avatar[0].file);
    }

    const actionImgCompress = async fileSrc => {
        console.log("압축 시작");
      
        const options = {
          maxSizeMB: 0.2,
          maxWidthOrHeight: 1920,
          useWebWorker: true
        };
        try {
          const compressedFile = await imageCompression(fileSrc, options);
      
          // FileReader 는 File 혹은 Blob 객체를 이용하여, 파일의 내용을 읽을 수 있게 해주는 Web API
          const reader = new FileReader();
          reader.readAsDataURL(compressedFile);
          reader.onloadend = () => {
            // 변환 완료!
            const base64data = reader.result;
            console.log(base64data)
      
            // formData 만드는 함수
            // handlingDataForm(base64data);
          };
        } catch (error) {
          console.log(error);
        }
      };

    return(
        <>
        <ImagePicker
        files={data.avatar}
        onChange={onClickImageUpload}
        onImageClick={(index,fs) => console.log(index,fs)}
        accept="image/gif, image/jpeg, image/jpg, image/png">
            
        </ImagePicker>
        <button type='ghost' onClick={onSubmit}>
        저장하기
    </button>
    </>
    );
};

export default ImageUpload;
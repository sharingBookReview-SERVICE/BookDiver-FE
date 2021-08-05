import { useState } from 'react'
import axios from 'axios'
import instance from "../shared/Request"


async function postImage(image) {
  const formData = new FormData();
  formData.append("image", image)

  const result = await instance.post('/books/9791160022988/reviews/images', formData, { headers: {'Content-Type': 'multipart/form-data'}})
  return result.data
}

const ImageUpload = () => {

  const [file, setFile] = useState()

  const submit = async event => {
    event.preventDefault()
    const result = await postImage(file)
  }

  const fileSelected = event => {
    const file = event.target.files[0]
		setFile(file)
	}

  return (
      <form onSubmit={submit}>
        <input onChange={fileSelected} type="file" accept="image/*"></input>
        <button type="submit">Submit</button>
      </form>
  );
}

export default ImageUpload;
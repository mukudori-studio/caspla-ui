import { axiosClient } from '@/utils/axiosClient'

const uploadImage = async (file: object) => {
  try {
    const res = await axiosClient.get('/api/v1/util/getBase64', {
      params: {
        file: file
      },
    })
    return res.data
  } catch(err) {
    throw err
  }
}

export default uploadImage

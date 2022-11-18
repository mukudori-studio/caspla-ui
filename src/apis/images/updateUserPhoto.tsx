import { axiosClient } from '@/utils/axiosClient'

const updateUserPhoto = async (userId: number, type: string, image: any) => {
  try {
    const res = await axiosClient.post(`/api/v1/casts/update_photo?user_id=${userId}&type=${type}`, {
      photo: image
    }, {
      headers: {
        'content-type': 'multipart/form-data',
      }
    })
    return res.data
  } catch(err) {
    throw err
  }
}

export default updateUserPhoto
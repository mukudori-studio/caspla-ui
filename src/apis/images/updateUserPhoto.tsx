import { axiosClient } from '@/utils/axiosClient'

const updateUserPhoto = async (userId: number, type: string, image: any) => {
  try {
    if(!image.type) {
      const res = await axiosClient.delete(`/api/v1/casts/delete_photo?user_id=${userId}&type=${type}`)
      return res.data;
    } else {
      const res = await axiosClient.post(`/api/v1/casts/update_photo?user_id=${userId}&type=${type}`, {
        photo: image
      }, {
        headers: {
          'content-type': 'multipart/form-data',
        }
      })
      return res.data
    }
  } catch(err) {
    throw err
  }
}

export default updateUserPhoto
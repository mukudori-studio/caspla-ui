import { axiosClient } from '@/utils/axiosClient'

const updateCover = async (userId: number, image: any) => {
  try {
    const res = await axiosClient.post(`/api/v1/casts/update_photo?user_id=${userId}&type=COVER`, {
      photo: image
    }, {
      headers: {
        'content-type': 'multipart/form-data',
      }
    })
    return res
  } catch(err) {
    throw err
  }
}

export default updateCover

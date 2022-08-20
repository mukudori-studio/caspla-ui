import { axiosClient } from '@/utils/axiosClient'

const updateThumbnail = async (userId: string, image: any) => {
  try {
    const res = await axiosClient.post(`/api/v1/casts/update_photo?user_id=${userId}&type=THUBMANIL`, {
      photo: image.files[0]
    })
    return res
  } catch(err) {
    throw err
  }
}

export default updateThumbnail
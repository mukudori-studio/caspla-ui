import { axiosClient } from '@/utils/axiosClient'

const updateThumbnail = async (userId: string, image: any) => {
  let formData = new FormData(); 
  formData.append("file", image.files[0])
  try {
    const res = await axiosClient.post(`/api/v1/casts/update_photo?user_id=${userId}&type=THUBMANIL`, {
      photo: formData
    })
    return res
  } catch(err) {
    throw err
  }
}

export default updateThumbnail
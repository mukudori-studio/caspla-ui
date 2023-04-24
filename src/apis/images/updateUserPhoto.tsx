import { axiosClient } from '@/utils/axiosClient'

const updateUserPhoto = async (userId: number, type: string, image: any) => {
  try {
    console.log(image);
    if(!image.type) {
      const res = await axiosClient.delete(`/api/v1/casts/delete_photo?user_id=${userId}&type=${type}`)
      return res.data;
    } else {
      if(image.size >= 5245329) {
        throw new Error("Image size exceeded");
      }
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
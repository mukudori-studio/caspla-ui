import { axiosClient } from '@/utils/axiosClient'

const updateCompanyLogo = async (userId: number, image: any) => {
  try {
    const res = await axiosClient.post(`/api/v1/company/update_photo?id=${userId}`, {
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

export default updateCompanyLogo
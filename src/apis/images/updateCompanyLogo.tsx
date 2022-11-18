import { axiosClient } from '@/utils/axiosClient'

const updateCompanyLogo = async (corpId: string, image: any) => {
  try {
    const res = await axiosClient.post(`/api/v1/company/update_photo?corpId=${corpId}`, {
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

export default updateCompanyLogo
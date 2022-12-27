import { axiosClient } from '@/utils/axiosClient'

const updateCompanyLogo = async (corpId: string, image: any) => {
  try {
    if(image==='') {
      const res = await axiosClient.delete(`/api/v1/company/delete_photo?corpId=${corpId}`)
      return res.data
    } else {
      const res = await axiosClient.post(`/api/v1/company/update_photo?corpId=${corpId}`, {
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

export default updateCompanyLogo
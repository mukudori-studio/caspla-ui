import { axiosClient } from '@/utils/axiosClient'

const updateProductionLogo = async (productionId: string, image: any) => {
  try {
    if(image==='') {
      const res = await axiosClient.delete(`/api/v1/production/delete_photo?id=${productionId}`)
      return res.data
    } else {
      const res = await axiosClient.post(`/api/v1/production/update_photo?id=${productionId}`, {
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

export default updateProductionLogo
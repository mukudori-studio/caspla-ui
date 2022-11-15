import { axiosClient } from '@/utils/axiosClient'

const updateProductionLogo = async (productionId: number, image: any) => {
  try {
    const res = await axiosClient.post(`/api/v1/production/update_photo?id=${productionId}`, {
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

export default updateProductionLogo
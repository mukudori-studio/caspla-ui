import { axiosClient } from '@/utils/axiosClient'

const getProductionDetailTalents = async (productionId: string | string[] | undefined) => {
  try {

    const response = await axiosClient.get('/api/v1/production/get_talents_list', {
      params: {
        productionId: productionId
      }
    })

    return response.data
  } catch(err:any) {
    return err.response
  }
}

export default getProductionDetailTalents

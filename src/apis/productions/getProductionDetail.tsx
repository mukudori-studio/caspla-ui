import { axiosClient } from '@/utils/axiosClient'

const getProductionDetail = async (productionId: string | string[] | undefined) => {
  try {

    const response = await axiosClient.get(`/api/v1/production/view/${productionId}`)

    return response.data
  } catch(err:any) {
    return err.response
  }
}

export default getProductionDetail

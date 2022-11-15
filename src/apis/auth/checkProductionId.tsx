import { axiosClient } from '@/utils/axiosClient'

const checkProductionId = async (productionId: string, sessionProductionId: string) => {
  try {
    const res = await axiosClient.get(`/api/v1/production/check_production_id`, {
      params: {
        production_id: productionId,
        sessionProductionId: sessionProductionId
      }
    })
    return res
  } catch(err) {
    throw err
  }
}

export default checkProductionId
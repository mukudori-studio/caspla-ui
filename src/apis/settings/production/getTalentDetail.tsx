import { axiosClient } from '@/utils/axiosClient'

const getProductionTalents = async (managerId: string | string[] | undefined, talentCasplaId: string | string[] | undefined) => {
  
  try {

    const response = await axiosClient.get('/api/v1/production_casts/', {
      params: {
        manager_caspla_id: managerId,
        user_caspla_id: talentCasplaId
      }
    })

    return response.data
  } catch(err:any) {
    return err.response
  }
}

export default getProductionTalents

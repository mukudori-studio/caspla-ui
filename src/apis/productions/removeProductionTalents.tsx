import { axiosClient } from '@/utils/axiosClient'

const removeProductionTalents = async (talentCasplaId: string | string[] | undefined, sessionCasplaId : string) => {
  try {
    
    const response = await axiosClient.delete(`/api/v1/production_casts/user_batch`, {
        params : {
            manager_caspla_id : sessionCasplaId,
            users: talentCasplaId
        }
    })

    return response.data
  } catch(err:any) {
    return err.response
  }
}

export default removeProductionTalents

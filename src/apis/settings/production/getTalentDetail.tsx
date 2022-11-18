import { axiosClient } from '@/utils/axiosClient'

const getProductionTalents = async (managerId: string, talentCasplaId: string | string[] | undefined, accessToken: string) => {
  
  try {
    if(typeof talentCasplaId==='undefined'){
      return
    }
    const response = await axiosClient.get('/api/v1/production_casts/', {
      params: {
        manager_caspla_id: managerId,
        user_caspla_id: talentCasplaId
      }, 
      headers : {
        Authorization: `Bearer ${accessToken}`
      }
    })

    return response.data
  } catch(err:any) {
    throw err
  }
}

export default getProductionTalents

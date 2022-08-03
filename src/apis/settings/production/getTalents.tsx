import { axiosClient } from '@/utils/axiosClient'
import { useRecoilValue } from 'recoil'
import { sessionState } from '@/stores/Session'

const getProductionTalents = async (talentCasplaId: string | string[] | undefined) => {
  const session = useRecoilValue(sessionState)
  try {

    const response = await axiosClient.get('/api/v1/production_casts/', {
      params: {
        manager_caspla_id: session.casplaId,
        user_caspla_id: talentCasplaId
      }
    })

    return response.data
  } catch(err:any) {
    return err.response
  }
}

export default getProductionTalents

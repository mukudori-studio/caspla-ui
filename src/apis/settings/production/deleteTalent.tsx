import { axiosClient } from '@/utils/axiosClient'
import { useRecoilValue } from 'recoil'
import { sessionState } from '@/stores/Session'

const deleteProductionTalents = async (talentCasplaId: string | string[] | undefined) => {
  const session = useRecoilValue(sessionState)
  try {

    const response = await axiosClient.delete('/api/v1/production_casts/', {
      data: {
        manager_caspla_id: session.casplaId,
        user_caspla_id: talentCasplaId
      }
    })

    return response.data
  } catch(err:any) {
    return err.response
  }
}

export default deleteProductionTalents

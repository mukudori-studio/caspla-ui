import { axiosClient } from '@/utils/axiosClient'
import { useRecoilValue } from 'recoil'
import { sessionState } from '@/stores/Session'

const putProductionTalent = async (talentCasplaId: string | string[] | undefined, data: object) => {
  const session = useRecoilValue(sessionState)
  try {

    const response = await axiosClient.put(`/api/v1/production_casts/update/${talentCasplaId}`, {
      data
    })

    return response.data
  } catch(err:any) {
    return err.response
  }
}

export default putProductionTalent
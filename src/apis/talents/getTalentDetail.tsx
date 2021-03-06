import { axiosClient } from '@/utils/axiosClient'
import { useRecoilValue } from 'recoil'
import { sessionState } from '@/stores/Session'

const getTalentDetail = async (casplaId: string | string[] | undefined) => {
  // const session = useRecoilValue(sessionState)
  try {

    const response = await axiosClient.get(`/api/v1/casts/get_user_details?caspla_id=${casplaId}`)

    return response.data
  } catch(err:any) {
    return err.response
  }
}

export default getTalentDetail

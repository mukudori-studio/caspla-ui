import { axiosClient } from '@/utils/axiosClient'
import { useRecoilValue } from 'recoil'
import { userAtom } from '@/stores/Session'

const getTalentDetail = async (casplaId: string | string[] | undefined) => {
  // const session = useRecoilValue(userAtom)
  try {

    const response = await axiosClient.get('/api/v1/casts/get_user_details', {
      params: {
        caspla_id: casplaId,
        loggedUser: 'any'
      }
    })

    return response.data
  } catch(err:any) {
    return err.response
  }
}

export default getTalentDetail

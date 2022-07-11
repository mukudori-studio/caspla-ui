import { axiosClient } from '@/utils/axiosClient'
import { useRecoilValue } from 'recoil'
import { sessionState } from '@/stores/Session'

const getTalentDetail = async (casplaId: string) => {
  const session = useRecoilValue(sessionState)
  if (!casplaId) return
  try {

    const response = await axiosClient.get('/api/v1/casts/getAllDetails', {
      headers: {
        'Authorization': session?.accessToken
      },
      params: {
        caspla_id: casplaId
      }
    })

    return response
  } catch(err) {
    throw err
  }
}

export default getTalentDetail

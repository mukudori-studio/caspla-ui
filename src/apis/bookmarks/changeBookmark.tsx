import { axiosClient } from '@/utils/axiosClient'
import { useRecoilValue } from 'recoil'
import { sessionState } from '@/stores/Session'

const changeBookmark = async (targetCasplaId: string | string[] | undefined) => {
  const session = useRecoilValue(sessionState)
  try {

    const response = await axiosClient.post('/api/v1/bookmark/', {
      loggedUserCasplaId: session.casplaId,
      addedUserCasplaId: targetCasplaId
    })

    return response.data
  } catch(err:any) {
    return err.response
  }
}

export default changeBookmark

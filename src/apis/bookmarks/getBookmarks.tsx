import { axiosClient } from '@/utils/axiosClient'
import { useRecoilValue } from 'recoil'
import { userAtom } from '@/stores/Session'

const getBookmarks = async () => {
  const session = useRecoilValue(userAtom)
  try {

    const response = await axiosClient.get('/api/v1/bookmark/', {
      params: {
        caspla_id: session.casplaId
      }
    })

    return response.data
  } catch(err:any) {
    return err.response
  }
}

export default getBookmarks

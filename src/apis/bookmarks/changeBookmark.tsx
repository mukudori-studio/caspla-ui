import { axiosClient } from '@/utils/axiosClient'

const changeBookmark = async (targetCasplaId: string, sessionCasplaId: string) => {
  try {
    const requestBody = {
      loggedUserCasplaId: sessionCasplaId,
      addedUserCasplaId: targetCasplaId
    }
    const response = await axiosClient.post('/api/v1/bookmark/post', requestBody)

    return response.data
  } catch(err:any) {
    return err.response
  }
}

export default changeBookmark

import { axiosClient } from '@/utils/axiosClient'

const changeBookmark = async (targetCasplaId: string, sessionCasplaId: string, token: string ) => {
  try {
    const requestBody = {
      loggedUserCasplaId: sessionCasplaId,
      addedUserCasplaId: targetCasplaId
    }
    const response = await axiosClient.post('/api/v1/bookmark/post', requestBody, {
      headers: {
        Authorization : `Bearer ${token}`
      }
    })

    return response.data
  } catch(err:any) {
    return err.response
  }
}

export default changeBookmark

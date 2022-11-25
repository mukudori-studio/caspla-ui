import { axiosClient } from '@/utils/axiosClient'

const getBookmarks = async (casplaId: string, accessToken: string) => {
  try {

    const response = await axiosClient.get(`/api/v1/bookmark/${casplaId}`, {
      headers : {
        Authorization : `Bearer ${accessToken}`
      }
    })

    return response.data
  } catch(err:any) {
    return err.response
  }
}

export default getBookmarks
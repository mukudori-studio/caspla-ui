import { axiosClient } from '@/utils/axiosClient'

const getTalentDetail = async (casplaId: string | string[] | undefined, loggedUser : string) => {
  try {

    const response = await axiosClient.get('/api/v1/casts/get_user_details', {
      params: {
        caspla_id: casplaId,
        loggedUser: loggedUser
      }
    })

    return response.data
  } catch(err:any) {
    return err.response
  }
}

export default getTalentDetail

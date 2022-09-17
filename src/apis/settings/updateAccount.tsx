import { axiosClient } from '@/utils/axiosClient'

const updateAccount = async (casplaId: string, data: any, accessToken: string) => {
  try {

    const postData = {
      fullName: data.fullName,
      furigana: data.furigana,
      email: data.email,
      casplaId: data.casplaId,
      password: data.password,
    }

    const res = await axiosClient.put(`/api/v1/casts/update_account?casplaId=${casplaId}`, {
      params: {
        caspla_id: casplaId,
        loggedUser: accessToken
      },
      headers: {
        Authorization: `Bearer ${accessToken}`,
      }
    })
    return res
  } catch(err) {
    throw err
  }
}

export default updateAccount

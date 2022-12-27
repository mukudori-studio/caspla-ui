import { axiosClient } from '@/utils/axiosClient'

const updateAccount = async (casplaId: string, data: any) => {
  try {

    const postData = {
      "casplaId": data.casplaId,
      "email": data.email,
      "password":data.password,
      "fullName": data.fullName ,
      "furigana": data.furigana,
      "needForLetter": data.needForLetter
    }

    const res = await axiosClient.put(`/api/v1/casts/update_account?casplaId=${casplaId}`, postData)
    return res
  } catch(err) {
    throw err
  }
}

export default updateAccount

import { axiosClient } from '@/utils/axiosClient'

const sendEmail = async (data: any, needForLetter: boolean) => {
  try {

    const postData = {
      email: data.email,
      needForLetter: needForLetter
    }

    const res = await axiosClient.post(`/api/v1/auth/send_email`, postData)
    return res
  } catch(err) {
    throw err
  }
}

export default sendEmail
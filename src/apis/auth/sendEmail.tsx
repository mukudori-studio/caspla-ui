import { axiosClient } from '@/utils/axiosClient'

const sendEmail = async (email: string | string[] | undefined, needForLetter: any, sendAgain : boolean) => {
  try {

    const postData = {
      email: email,
      needForLetter: needForLetter,
      sendAgain: sendAgain
    }

    const res = await axiosClient.post(`/api/v1/auth/send_email`, postData)
    return res
  } catch(err) {
    throw err
  }
}

export default sendEmail
import { axiosClient } from '@/utils/axiosClient'

const sendEmail = async (email: string) => {
  try {

    const res = await axiosClient.get(`/api/v1/reset_password/send_email`, {
      params: {
        email: email
      }
    })
    return res.data
  } catch(err:any) {
    return err.response
  }
}

export default sendEmail
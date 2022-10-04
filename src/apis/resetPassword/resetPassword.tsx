import { axiosClient } from '@/utils/axiosClient'

const sendEmail = async (token: any, password: string, rePassword: string) => {
  try {

    const postData = {
      token: token,
      password: password,
      rePassword: rePassword
    }

    const res = await axiosClient.post(`/api/v1/reset_password`, postData)
    return res
  } catch(err:any) {
    return err.response
  }
}

export default sendEmail
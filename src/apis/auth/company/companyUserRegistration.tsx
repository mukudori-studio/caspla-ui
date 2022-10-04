import { axiosClient } from '@/utils/axiosClient'

const companyUserRegistration = async (data: any) => {
  try {

    const postData = {
      fullName: data.fullName,
      furigana: data.furigana,
      email: data.email,
      casplaId: data.casplaId,
      password: data.password,
      role: 'COMPANY_ADMIN'
    }

    const res = await axiosClient.post('/api/v1/auth/save_user', postData)
    return res
  } catch(err) {
    throw err
  }
}

export default companyUserRegistration
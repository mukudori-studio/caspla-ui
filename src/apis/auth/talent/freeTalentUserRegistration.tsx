import { axiosClient } from '@/utils/axiosClient'

const freeTalentUserRegistration = async (data: any) => {
  try {

    const postData = {
      fullName: data.fullName,
      furigana: data.furigana,
      email: data.email,
      casplaId: data.casplaId,
      password: data.password,
      role: 'FREE_TALENT'
    }

    const res = await axiosClient.post('/api/v1/auth/save_user', postData)
    return res
  } catch(err) {
    throw err
  }
}

export default freeTalentUserRegistration
import { axiosClient } from '@/utils/axiosClient'

const linkCompanyUser = async (userCasplaId: string, companyId: string) => {
  try {

    const res = await axiosClient.post('/api/v1/company/add_user_to_company', {
      userCasplaId: userCasplaId,
      companyId: companyId
    })
    return res
  } catch(err) {
    throw err
  }
}

export default linkCompanyUser
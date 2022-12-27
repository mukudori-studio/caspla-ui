import { axiosClient } from '@/utils/axiosClient'

const getCompanyDetails = async (companyId: string) => {
  try {
    const response = await axiosClient.get(`/api/v1/company/?corpId=${companyId}`)
    return response.data
  } catch(err:any) {
    throw err.response
  }
}

export default getCompanyDetails
import { axiosClient } from '@/utils/axiosClient'

const checkCorpId = async (corpId: string) => {
  try {
    const res = await axiosClient.get(`/api/v1/company/check_company_id`, {
      params: {
        companyId: corpId
      }
    })
    return res
  } catch(err) {
    throw err
  }
}

export default checkCorpId
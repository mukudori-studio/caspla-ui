import { axiosClient } from '@/utils/axiosClient'

const checkCorpId = async (corpId: string, sessionCorpId: string) => {
  try {
    const res = await axiosClient.get(`/api/v1/company/check_company_id`, {
      params: {
        companyId: corpId,
        sessionCorpId: sessionCorpId
      }
    })
    return res.data
  } catch(err) {
    throw err
  }
}

export default checkCorpId
import { axiosClient } from '@/utils/axiosClient'

const getTalentDetail = async (casplaId: string) => {
  try {

    const response = await axiosClient.get('/api/v1/casts/getAllDetails', {
      params: {
        caspla_id: casplaId
      }
    })

    return response
  } catch(err) {
    throw err
  }
}

export default getTalentDetail

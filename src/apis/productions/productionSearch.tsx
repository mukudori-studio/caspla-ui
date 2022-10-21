import { axiosClient } from '@/utils/axiosClient'

const getProductionList = async (filterValues: string[]) => {
  try {
    const response = await axiosClient.get('/api/v1/open/productions', {
      params: {
        filter: filterValues
      }
    })

    return response
  } catch(err:any) {
    throw err
  }
}

export default getProductionList
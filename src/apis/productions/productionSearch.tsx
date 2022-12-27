import { axiosClient } from '@/utils/axiosClient'

const getProductionList = async (filterValues: string[], hasSubLetter: boolean, isJapanese: boolean) => {
  try {
    const response = await axiosClient.get('/api/v1/open/productions', {
      params: {
        filter: filterValues,
        hasSubLetters : hasSubLetter, 
        isJapanese : isJapanese
      }
    })

    return response
  } catch(err:any) {
    throw err
  }
}

export default getProductionList
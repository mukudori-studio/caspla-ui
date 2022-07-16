import { axiosClient } from '@/utils/axiosClient'

type getTalentsProps = {
  pageId?: any
  activity?: Array<string>
  age?: Array<string>
  gender?: Array<string>
  keyword?: string | string[]
}

const getTalents = async ({
  pageId = 1,
  activity = [],
  age = [],
  gender = [],
  keyword = ''
}:getTalentsProps) => {
  try {

    const response = await axiosClient.get('/api/v1/open/casts', {
      params: {
        page: Number(pageId),
        activity: activity,
        age: age,
        gender: gender,
        keyword: keyword
      }
    })

    return response
  } catch(err) {
    throw err
  }
}

export default getTalents
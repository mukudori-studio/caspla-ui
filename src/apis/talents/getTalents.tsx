import { axiosClient } from '@/utils/axiosClient'

type getTalentsProps = {
  pageId?: any
  activity?: any
  age?: any
  gender?: any
  keyword?: string | string[],
  casplaId : string
}

const getTalents = async ({
  pageId = 1,
  activity,
  age,
  gender,
  keyword = '',
  casplaId
}:getTalentsProps) => {
  try {

    let filterParams: any = {}
    filterParams.page = Number(pageId)
    filterParams.keyword = keyword !== '' || keyword !== undefined || !keyword ? keyword : 'all'
    if (gender !== undefined) filterParams.gender = gender
    if (age !== undefined) filterParams.age = age
    if (activity !== undefined) filterParams.activity = activity
    filterParams.user = casplaId
    const response = await axiosClient.get('/api/v1/open/casts', {
      params: filterParams
    })

    return response.data
  } catch(err) {
    throw err
  }
}

export default getTalents
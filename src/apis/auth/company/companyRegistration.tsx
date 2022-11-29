import { axiosClient } from '@/utils/axiosClient'

const companyRegistration = async (data: any) => {
  try {

    const postData = {
      id: data.corpId,
      name: data.companyName,
      description: data.description,
      zipCode: data.zipCode,
      prefecture: data.prefecture,
      address1: data.address1,
      address2: data.address2,
      tel: data.tel,
      links: {
        twitterId: data.twitterId,
        facebookId: data.facebookId,
        instagramId: data.instagramId,
        youtubeId: data.youtubeId,
        tiktokId: data.tiktokId,
        blogUrl: data.blogUrl,
        siteUrl: data.siteUrl
      }
    }

    const res = await axiosClient.post(`/api/v1/company/create`, postData)
    return res.data
  } catch(err) {
    throw err
  }
}

export default companyRegistration
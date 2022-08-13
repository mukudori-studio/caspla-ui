import { axiosClient } from '@/utils/axiosClient'

const companyRegistration = async (account: any, data: any, thumbnail: string) => {
  try {

    const postData = {
      thumbnailImage: account.thumbnailImage,
      furigana: account.furigana,
      fullName: account.fullName,
      email: account.email,
      casplaId: account.casplaId,
      password: account.password,
      companyId: data.companyId,
      companyName: data.companyName,
      description: data.description,
      zipCode: data.zipCode,
      prefecture: data.prefecture,
      address1: data.address1,
      address2: data.address2,
      tel: data.tel,
      companyLogo: data.companyLogo,
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
    return res
  } catch(err) {
    throw err
  }
}

export default companyRegistration
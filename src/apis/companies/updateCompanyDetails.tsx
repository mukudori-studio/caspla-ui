import { axiosClient } from '@/utils/axiosClient'

const updateCompanyDetails = async (companyId: string, data : any) => {
  try {
    console.log(data)
    let requestBody = {
        "id": data.companyId,
        "name": data.companyName,
        "description": data.profile,
        "zipCode": data.zipcode,
        "prefecture": data.prefecture,
        "address1": data.address1,
        "address2": data.address2,
        "tel": data.tel,
        "links": {
          "twitterId": data.twitterId,
          "facebookId": data.facebookId,
          "instagramId": data.instagramId,
          "youtubeId": data.youtubeId,
          "tiktokId": data.tiktokId,
          "blogUrl": data.blogUrl,
          "siteUrl": data.siteUrl
        }
      }
    const response = await axiosClient.put(`/api/v1/company/update?corpId=${companyId}`, requestBody)
    return response.data

  } catch(err:any) {
    throw err.response
  }
}

export default updateCompanyDetails
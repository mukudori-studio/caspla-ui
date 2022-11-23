import { axiosClient } from '@/utils/axiosClient'

const createProductionTalent = async (data : any ,sessionCasplaId: string ) => {
  try {
     let requestBody = {
        "casplaId": data.casplaId,
        "fullName": data.fullName,
        "email": data.email,
        "password": data.password,
        "gender": data.gender,
        "profile": data.profile,
        "birthYear": data.birthYear,
        "birthMonth": data.birthMonth,
        "birthDay": data.birthDay,
        "starSign": data.constellation,
        "birthplace": data.birthplace,
        "bloodType": data.bloodType,
        "height": data.height,
        "weight": data.weight,
        "bust": data.bust,
        "waist": data.waist,
        "hip": data.hip,
        "footSize": data.footSize,
        "history": data.history,
        "note": data.note,
        "furigana": data.furigana,
        "activities": data.activity,
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
    const response = await axiosClient.post(`/api/v1/production_casts/new_cast_by_manager?manager_caspla_id=${sessionCasplaId}`, requestBody)

    return response.data
  } catch(err:any) {
    return err.response
  }
}

export default createProductionTalent
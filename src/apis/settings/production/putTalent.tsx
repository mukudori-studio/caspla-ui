import { axiosClient } from '@/utils/axiosClient'

const putProductionTalent = async (talentCasplaId: string | string[] | undefined, data: any, sessionCasplaId : string) => {
  try {
    const year = data.birthYear===''||data.birthYear==='null'? 0: data.birthYear
    const month = data.birthMonth===''||data.birthMonth==='null'? 0: data.birthMonth
    const date = data.birthDay===''||data.birthDay==='null'? 0: data.birthDay

    let body = {
      "casplaId": data.casplaId,
      "fullName": data.fullName,
      "password": data.password,
      "gender": data.gender,
      "profile": data.profile,
      "birthYear": year,
      "birthMonth": month,
      "birthDay": date,
      "constellation": data.constellation,
      "birthplace": data.birthplace,
      "bloodType": data.bloodType,
      "height": parseFloat(data.height),
      "weight": parseFloat(data.weight),
      "bust": parseFloat(data.bust),
      "waist": parseFloat(data.waist),
      "hip": parseFloat(data.hip),
      "footSize": parseFloat(data.footSize),
      "history": data.history,
      "note": data.note,
      "furigana": data.furigana,
      "links": {
        "twitterId": data.twitterId,
        "facebookId": data.facebookId,
        "instagramId": data.instagramId,
        "youtubeId": data.youtubeId,
        "tiktokId": data.tiktokId,
        "blogUrl": data.blogUrl,
        "siteUrl": data.siteUrl
      },
      "activities": data.activity
    }
    const response = await axiosClient.put(`/api/v1/production_casts/update/${talentCasplaId}?manager_caspla_id=${sessionCasplaId}`, body)

    return response.data
  } catch(err:any) {
    return err.response
  }
}

export default putProductionTalent

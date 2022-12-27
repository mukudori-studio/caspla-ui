import { axiosClient } from '@/utils/axiosClient'

const updateAccount = async (casplaId: string, data: any) => {
  try {
    let height = Number.isNaN(parseFloat(data.height)) ? null : parseFloat(data.height)
    let weight = Number.isNaN(parseFloat(data.weight)) ? null : parseFloat(data.weight)
    let bust = Number.isNaN(parseFloat(data.bust)) ? null : parseFloat(data.bust)
    let waist = Number.isNaN(parseFloat(data.waist)) ? null : parseFloat(data.waist)
    let hip = Number.isNaN(parseFloat(data.hip)) ? null : parseFloat(data.hip)
    let footSize = Number.isNaN(parseFloat(data.footSize)) ? null : parseFloat(data.footSize)
    const postData = {
      casplaId: data.casplaId,
      fullName: data.fullName,
      gender: data.gender,
      profile: data.profile,
      birthYear: parseInt(data.birthYear),
      birthMonth: parseInt(data.birthMonth),
      birthDay: parseInt(data.birthDay),
      birthplace: data.birthplace,
      bloodType: data.bloodType===''?null:data.bloodType,
      height: height,
      weight: weight,
      bust: bust,
      waist: waist,
      hip: hip,
      footSize: footSize,
      history: data.history,
      note: data.note,
      furigana: data.furigana,
      constellation: data.constellation,
      links: {
        twitterId: data.twitterId,
        facebookId: data.facebookId,
        instagramId: data.instagramId,
        youtubeId: data.youtubeId,
        tiktokId: data.tiktokId,
        blogUrl: data.blogUrl,
        siteUrl: data.siteUrl,
      },
      activities: data.activity,
    }

    const res = await axiosClient.put(`/api/v1/casts/update_details?caspla_id=${casplaId}`, postData)
    return res.data
  } catch(err) {
    throw err
  }
}

export default updateAccount

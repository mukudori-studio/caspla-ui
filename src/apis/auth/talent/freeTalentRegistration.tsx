import { axiosClient } from '@/utils/axiosClient'

const freeTalentRegistration = async (data: any, casplaId: string) => {
  try {

    const postData = {
      gender: data.gender,
      birthYear: parseFloat(data.birthYear),
      birthMonth: parseFloat(data.birthMonth),
      birthDate: parseFloat(data.birthDay),
      constellation: data.starSign,
      bloodGroup: data.bloodType===''?null:data.bloodType,
      birthPlace: data.birthplace,
      height: parseFloat(data.height),
      weight: parseFloat(data.weight),
      bust: parseFloat(data.bust),
      waist: parseFloat(data.waist),
      hip: parseFloat(data.hip),
      footSize: parseFloat(data.footSize),
      history: data.history,
      note: data.note,
      profile: data.profile,
      furigana: data.furigana,
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

    const res = await axiosClient.post(`/api/v1/auth/update_free_talent?caspla_id=${casplaId}`, postData)
    return res
  } catch(err) {
    throw err
  }
}

export default freeTalentRegistration
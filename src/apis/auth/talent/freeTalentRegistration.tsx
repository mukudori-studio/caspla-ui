import { axiosClient } from '@/utils/axiosClient'

const freeTalentRegistration = async (data: any, casplaId: string) => {
  try {

    const postData = {
      gender: data.gender,
      profile: data.profile,
      birthYear: parseFloat(data.birthYear),
      birthMonth: parseFloat(data.birthMonth),
      birthDay: parseFloat(data.birthDay),
      birthplace: data.birthplace,
      bloodType: data.bloodType,
      height: parseFloat(data.height),
      weight: parseFloat(data.weight),
      bust: parseFloat(data.bust),
      waist: parseFloat(data.waist),
      hip: parseFloat(data.hip),
      footSize: parseFloat(data.footSize),
      history: data.history,
      note: data.note,
      furigana: data.furigana,
      constellation: data.starSign,
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
import { axiosClient } from '@/utils/axiosClient'

const talentRegistration = async (data: any, thumbnail?: string) => {
  try {

    const postData = {
      // thumbnailImage: data.thumbnailImage,
      casplaId: data.casplaId,
      fullName: data.fullName,
      email: data.email,
      gender: data.gender,
      profile: data.profile,
      birthYear: data.birthYear,
      birthMonth: data.birthMonth,
      birthDay: data.birthDay,
      birthplace: data.birthplace,
      bloodType: data.bloodType,
      height: data.height,
      weight: data.weight,
      bust: data.bust,
      waist: data.waist,
      hip: data.hip,
      footSize: data.footSize,
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
        siteUrl: data.siteUrl
      },
      activities: data.activities
    }

    const res = await axiosClient.post('/api/v1/casts/new', postData)
    return res
  } catch(err) {
    throw err
  }
}

export default talentRegistration
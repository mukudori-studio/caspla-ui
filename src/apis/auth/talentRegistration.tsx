import { axiosClient } from '@/utils/axiosClient'

const talentRegistration = async (account: any, data: any, thumbnail?: string) => {
  try {

    const postData = {
      // thumbnailImage: data.thumbnailImage,
      casplaId: account.casplaId,
      fullName: account.fullName,
      email: account.email,
      password: account.passowrd,
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
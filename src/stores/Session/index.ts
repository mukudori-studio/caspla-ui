import { atom } from 'recoil'
import { recoilPersist } from 'recoil-persist'
const { persistAtom } = recoilPersist()

// NOTE：ユーザーデータ保存用
const sessionState = atom({
  key: 'session',
  default: {
    userId: 0,
    accessToken: '',
    refreshToken: '',
    role: '',
    casplaId: '',
    fullName: '',
    productionId: '',
    productionName: '',
    productionAdmin: ''
  },
  effects_UNSTABLE: [persistAtom]
})

const sessionThumbnailState = atom({
  key: 'sessionThumbnail',
  default: {
    thumbnailImage: ''
  },
  effects_UNSTABLE: [persistAtom]
})

export {sessionState, sessionThumbnailState}
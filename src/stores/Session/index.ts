import { atom } from 'recoil'
import { recoilPersist } from 'recoil-persist'
const { persistAtom } = recoilPersist()

// NOTE：ユーザーデータ保存用
export const sessionState = atom({
  key: 'session',
  default: {
    accessToken: '',
    refreshToken: '',
    role: '',
    casplaId: '',
    fullName: '',
    thumbnailImage: '',
    productionId: '',
    productionName: '',
    productionAdmin: ''
  },
  effects_UNSTABLE: [persistAtom]
})

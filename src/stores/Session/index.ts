import { atom } from 'recoil'
import { recoilPersist } from 'recoil-persist'
const { persistAtom } = recoilPersist()

// NOTE：ユーザーデータ保存用
export const sessionState = atom({
  key: 'session',
  default: {
    userId: '',
    accessToken: '',
    refreshToken: '',
    asRole: []
  },
  effects_UNSTABLE: [persistAtom]
})

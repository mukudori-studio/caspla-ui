import { atom, selector } from 'recoil'
import { recoilPersist } from 'recoil-persist'
const { persistAtom } = recoilPersist()

// NOTE：ユーザーデータ保存用
export const userAtom = atom({
  key: 'userDetail',
  default: {
    userId: 0,
    role: '',
    casplaId: '',
    fullName: '',
    companyId: '',
    companyName: '',
    isAdmin: false
  },
  effects_UNSTABLE: [persistAtom]
})


export const thumbnailAtom = atom({
  key: 'sessionThumbnail',
  default: '',
  effects_UNSTABLE: [persistAtom]
})

export const accessTokenAtom = atom({
  key: 'accessTokenAtom',
  default: "",
  effects_UNSTABLE: [persistAtom]
})

export const refreshTokenAtom = atom({
  key: 'sessionRefreshToken',
  default: "",
  effects_UNSTABLE: [persistAtom]
})
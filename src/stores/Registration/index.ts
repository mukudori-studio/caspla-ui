import { atom } from 'recoil'
import { recoilPersist } from 'recoil-persist'
const { persistAtom } = recoilPersist()

// NOTE：登録内容を一時的に保持
export const registrationState = atom({
  key: 'registration',
  default: {
    thumbnail: '',
    fullName: '',
    furigana: '',
    email: '',
    casplaId: '',
    password: '',
    role: ''
  },
  effects_UNSTABLE: [persistAtom]
})

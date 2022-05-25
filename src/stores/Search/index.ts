import { atom } from 'recoil'
import { recoilPersist } from 'recoil-persist'
const { persistAtom } = recoilPersist()

// NOTE：キーワード検索用
export const searchKeywordState = atom({
  key: 'searchKeyword',
  default: {
    keyword: '',
  },
  effects_UNSTABLE: [persistAtom]
})

// NOTE：タレント、プロダクション、オーディション検索用
export const searchTypeState = atom({
  key: 'searchType',
  default: {
    type: '',
  },
  effects_UNSTABLE: [persistAtom]
})
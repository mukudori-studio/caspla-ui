import { axiosClient } from '@/utils/axiosClient'
const jsonpAdapter = require('axios-jsonp')

const putAccount = async (code: string) => {
  try {
    const res = await axiosClient.post(`https://zipcloud.ibsnet.co.jp/api/search?zipcode=${code}`, {
      adapter: jsonpAdapter,
    })
    return res.data
  } catch(err) {
    throw err
  }
}

export default putAccount

import { axiosClient } from '@/utils/axiosClient'
import { useRecoilValue } from 'recoil'
import { userAtom } from '@/stores/Session'

const addProductionTalent = async (data: object) => {
  const session = useRecoilValue(userAtom)
  try {

    const response = await axiosClient.post(`/api/v1/production_casts/new_cast_by_manager?manager_caspla_id=${session.casplaId}`, {
      data
    })

    return response.data
  } catch(err:any) {
    return err.response
  }
}

export default addProductionTalent

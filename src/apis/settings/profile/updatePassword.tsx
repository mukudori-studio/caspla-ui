import { axiosClient } from '@/utils/axiosClient'

const updatePassword = async (casplaId: string, data: any) => {
    try {
        const postData = {
            prevPassword: data.prev_password,
            password: data.password,
            confirmPassword: data.password_confirmation
        }

        const res = await axiosClient.put(`/api/v1/casts/update_password?caspla_id=${casplaId}`, postData)
        return res.data
    } catch (err) {
        throw err
    }
}

export default updatePassword

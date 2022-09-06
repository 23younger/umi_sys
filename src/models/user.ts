
import { getUserInfo } from "@/services/user"
export default {
    namespace: 'user',
    state: {
        userInfo: {
            name: 'kkk'
        }
    },
    effects: {
        *queryUser({ payload }: any, { call, put }: any) {
            const { data } = yield call(getUserInfo, payload)
            yield put({type: 'updateUserInfo', payload: data})
        }
    },
    reducers: {
        updateUserInfo(state: any, { payload }: any) {
            return {
                ...state,
                userInfo: payload
            }
        }
    }
}
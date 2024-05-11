import store from '@/store'
import { defineStore } from 'pinia'
import { usePermissionStore } from './permission'
import { getToken, removeToken, setToken } from '@/utils/cookies'
import router, { resetRouter } from '@/router'
import { accountLogin, userInfoRequest } from '@/api/login'
import { RouteRecordRaw } from 'vue-router'

interface IUserState {
  token: string
  roles: string[]
}

export const useUserStore = defineStore({
  id: 'user',
  state: (): IUserState => {
    return {
      token: getToken() || '',
      roles: []
    }
  },
  actions: {
    /** 设置角色数组 */
    setRoles(roles: string[]) {
      this.roles = roles
    },
    /** 登录 */
    login(userInfo: { username: string, password: string }) {
      return new Promise((resolve, reject) => {
        accountLogin({
          username: userInfo.username.trim(),
          password: userInfo.password
        })
          .then((res: any) => {
            setToken(res.data.accessToken)
            this.token = res.data.accessToken
            resolve(true)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    /** 获取用户详情 */
    getInfo() {
      return new Promise((resolve, reject) => {
        userInfoRequest()
          .then((res: any) => {
            this.roles = res.data.user.roles
            resolve(res)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    /** 切换角色 */
    async changeRoles(role: string) {
      const token = role + '-token'
      this.token = token
      setToken(token)
      await this.getInfo()
      const permissionStore = usePermissionStore()
      permissionStore.setRoutes(this.roles)
      resetRouter()
      permissionStore.dynamicRoutes.forEach((item: RouteRecordRaw) => {
        router.addRoute(item)
      })
    },
    /** 登出 */
    logout() {
      removeToken()
      this.token = ''
      this.roles = []
      resetRouter()
    },
    /** 重置 token */
    resetToken() {
      removeToken()
      this.token = ''
      this.roles = []
    }
  }
})

/** 在 setup 外使用 */
export function useUserStoreHook() {
  return useUserStore(store)
}

// function throttle(fn, wait) {
//   let prev = 0
//   return function() {
//     let context = this
//     let args = arguments
//     let now = new Date()
//     if(now - prev > wait) {
//       fn.apply(context, args)
//       prev = now
//     }
//   }
// }

// function debounce(fn, wait) {
//   let timeout = null
//   return function() {
//     let context = this
//     let args = arguments
//     if(timeout) clearTimeout(timeout)
//     timeout = setTimeout(() => {
//       timeout = null
//     }, wait)
//     if(!timeout) fn.apply(context, args)
//   }
// }

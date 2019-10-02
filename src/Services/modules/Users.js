import User from '../models/User'
import Config from '../../Config/Config'
import axios from 'axios'

export const getUser = () => {
  const env = Config.env || 'local'
  const apiRoot = Config[env].apiRoot
  const url = apiRoot + Config.apiSrvUsers
  return new Promise((resolve, reject) => {
    axios.get(url)
      .then(response => {
        const data = response ? response.data : {}
        const userData = data ? data.data : {}
        const users = []
        for (const item of userData) {
          const user = new User()
          user.initWithData(item)
          users.push(user)
        }

        resolve(users)
      })
      .catch(err => {
        reject(err)
      })
  })
}

export const setUser = (data) => {
  console.warn(data)
}

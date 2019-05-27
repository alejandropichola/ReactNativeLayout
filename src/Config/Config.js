const config = {
  env: 'local',
  local: {
    apiRoot: 'http://192.168.56.1:3000'
  },
  development: {
    apiRoot: 'http://192.168.86.47:3000'
  },
  production: {
    apiRoot: 'http://192.168.86.47:3000'
  },
  apiSrvUsers: '/users',
  apiSrvUserItem: '/users/{userId}'
}

export default config

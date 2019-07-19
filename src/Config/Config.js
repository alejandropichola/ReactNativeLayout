const config = {
  env: 'local',
  local: {
    apiRoot: 'http://svn-desa.cloudapp.net:8080/megapharma-api'
  },
  development: {
    apiRoot: 'http://localhost:50942'
  },
  production: {
    apiRoot: 'http://localhost:50942'
  },
  apiSrvAuth: '/api/token',
  apiSrvUsers: '/users',
  apiSrvUserItem: '/users/{userId}'
}

export default config

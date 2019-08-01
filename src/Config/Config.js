const config = {
  env: 'local',
  local: {
    apiRoot: 'http://svn-desa.cloudapp.net:8080/Development/TEST_MEGALAB/API/api'
  },
  development: {
    apiRoot: 'http://svn-desa.cloudapp.net:8080/Development/TEST_MEGALAB/API/api'
  },
  production: {
    apiRoot: 'http://svn-desa.cloudapp.net:8080/megapharma-api/api'
  },
  apiSrvAuth: '/api/token',
  apiSrvUsers: '/users',
  apiSrvUserItem: '/users/{userId}',
  apiSrvUserForgotPassword: '/GetForgotPassword?usuario={usuario}'
}

export default config

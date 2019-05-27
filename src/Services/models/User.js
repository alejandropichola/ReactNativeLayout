import moment from 'moment'

export default class User {
  constructor () {
    this.id = ''
    this.firstName = ''
    this.lastName = ''
    this.email = ''
    this.gender = null
    this.birthDate = ''
  }

  initWithData (data = {}) {
    this.id = data ? data.userId : null
    const attributes = data ? data.attributes : {}
    this.firstName = attributes ? attributes.firstName : null
    this.lastName = attributes ? attributes.lastName : null
    this.email = attributes ? attributes.email : null
    this.gender = attributes ? attributes.gender : 'M'
    this.birthDate = attributes ? attributes.birthDate : null
  }

  getGender () {
    const gender = this.gender.toUpperCase()
    return (gender === 'M') ? 'Masculino' : 'Femenino'
  }

  getBirthDate () {
    return this.birthDate ? moment(this.birthDate).format('DD MMM YYYY') : null
  }
}

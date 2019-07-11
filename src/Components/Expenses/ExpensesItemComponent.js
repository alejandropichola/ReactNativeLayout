import React from 'react'
import { View, Picker, KeyboardAvoidingView } from 'react-native'
import { container, inputIOS, inputAndroid, select } from '../../../assets/Styles'
import DatePicker from 'react-native-datepicker'
import { containerLogin, heightInput } from '../../../assets/Login'
import InputTextDarkComponent from '../Common/InputTextDarkComponent'
import { Button } from 'react-native-elements'

export default class ExpensesItemComponent extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      promotion: null,
      provider: null,
      view: 1,
      date: null
    }
  }

  next () {
    this.props.navigation.navigate('createItem2')
  }

  back () {
    if (this.state.view > 1) {
      const counter = this.state.view
      this.setState({ view: (counter - 1) })
    }
  }

  render () {
    return (
      <KeyboardAvoidingView>
            <InputTextDarkComponent
                                    label='Proveedor'
                                    placeHolder='Ingrese el codigo del proveedor'
                                    note=''
                                    onChangeText={(provider) => this.setState({ provider })}
                                    value={this.state.provider}
            />
        <Button buttonStyle={{ backgroundColor: '#27b185' }} onPress={() => this.next()}
                title='Siguiente'/>
      </KeyboardAvoidingView>
    )
  }
}

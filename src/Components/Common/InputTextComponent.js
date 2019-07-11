import React from 'react'
import { Text, View } from 'react-native'
import {TextInput} from 'react-native-paper'
import { inputType } from '../../../assets/Styles'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { iconLeftStyle, paddingLeftPlaceholder, paddingRightPlaceholder, iconRightStyle, errorMsg } from '../../../assets/Styles'

class InputTextComponent extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      secureInput: this.props.secure,
      iconRightSecure: this.props.iconRight
    }
  }

  onFocus () {
    const state = this.state
    if (this.props.iconLeft && this.props.iconLeft.length > 0) {
      this.state.style = {
        borderBottomWidth: 2,
        borderColor: '#5388d0',
        paddingLeft: 18
      }
    } else {
      this.state.style = {
        borderBottomWidth: 2,
        borderColor: '#5388d0',
      }
    }
    this.setState({ state })
  }

  isSecure = () => {
    if (this.state.secureInput && this.props.secure) {
      this.setState({secureInput: false})
      this.setState({
        iconRightSecure: 'md-eye-off'
      })
    } else if (!this.state.secureInput && this.props.secure) {
      this.setState({secureInput: true})
      this.setState({
        iconRightSecure: 'md-eye'
      })
    }
  }

  onBlur () {
    const state = this.state
    this.state.style = {}
    this.setState({ state })
  }

  render () {
    return (
      <View>
        <View>
        </View>
        <View>
          {this.props.iconLeft && this.props.iconLeft.length > 0 ? <Ionicons style={iconLeftStyle}
                                                                             name={this.props.iconLeft}
                                                                             size={this.props.sizeIcon}
                                                                             color={this.props.colorIcon}/> : null}
          <TextInput placeholder={this.props.placeHolder}
                     label={this.props.label}
                     value={this.props.value}
                     onChangeText={this.props.onChangeText}
                     autocorrect={false}
                     autoCapitalize='none'
                     keyboardType={this.props.keyboardType}
                     style={[inputType, this.state.style,
                       this.props.iconLeft && this.props.iconLeft.length > 0 ? paddingLeftPlaceholder : null,
                       this.props.iconRight && this.props.iconRight.length > 0 ? paddingRightPlaceholder : null
                     ]}
                     theme={{colors: {background: 'transparent', text: '#fff', placeholder: '#e5e5e5'}}}
                     underlineColor='#fff'
                     secureTextEntry={this.state.secureInput}
                     onFocus={() => this.onFocus()}
                     onBlur={() => this.onBlur()}
                     ref={this.props.refInput}
                     returnKeyType = { this.props.returnKey }
                     onSubmitEditing={this.props.submit}
                     blurOnSubmit={this.props.blurSubmit}
                     error={(this.props.MessageError && this.props.MessageError.length > 0)}
          />
          {this.props.iconRight && this.props.iconRight.length > 0 ? <Ionicons onPress={this.isSecure}
                                                                               style={iconRightStyle}
                                                                               name={this.state.iconRightSecure}
                                                                               size={this.props.sizeIcon}
                                                                               color={this.props.colorIcon}/> : null}
          {this.props.note && this.props.note.length > 0 ? <Text>{this.props.note}</Text> : null}
          {this.props.MessageError && this.props.MessageError.length > 0 ?
            <Text style={errorMsg}>{this.props.MessageError}</Text> : null}
        </View>
      </View>
    )
  }
}

export default InputTextComponent

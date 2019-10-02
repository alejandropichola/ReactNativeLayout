import React from 'react'
import { Grid, Col, Row } from 'react-native-easy-grid'
import { Button, Text } from 'react-native-elements'
import { View, TouchableHighlight, Platform } from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign'
import { iconCenter } from '../../../assets/Login'
import { primary } from '../../../assets/Styles'

export default class ListDetailComponent extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      isShow: false
    }
  }

  detailShow = () => {
    if (!this.state.isShow)
      this.setState({ isShow: true })
    else this.setState({ isShow: false })
  }

  render () {
    return (
      <View style={{ paddingBottom: 2, marginBottom: 2, marginRight: 4, marginLeft: 4 }}>
        <TouchableHighlight
          onPress={this.detailShow}
          underlayColor={'#fff'}
        >
          <View style={{ backgroundColor: '#aad4dd', borderRadius: 7 }}>

            <Row style={{ height: 74 }}>
              <Col size={95}>
                <Text h4>{(this.props.title && this.props.title.length > 0) ? this.props.title : null}</Text>
                <Text>{(this.props.subtitle && this.props.title.length > 0) ? this.props.subtitle : null}</Text>
              </Col>
              <Col size={5}>
                <View style={iconCenter}>
                  {this.state.isShow === false ?
                    <Icon name="right" size={20}></Icon> :
                    <Icon name="down" size={20}></Icon>
                  }
                </View>
              </Col>
            </Row>
          </View>
        </TouchableHighlight>

        {this.state.isShow === true ?
          <View style={{ borderWidth: 1, borderColor: '#234D51', borderRadius: 7 }}>
            <View style={{ flex: 1, flexDirection: 'row' }}>
              <View style={{ width: (this.props.widthHeader) + '%' }}>
                {
                  this.props.detailHeader.map((item, key) => (
                    <View style={{ height: this.props.heightRow }} key={key}><Text
                      style={{ fontWeight: 'bold' }}>{item}</Text></View>
                  ))
                }
              </View>
              <View style={{ width: (100 - this.props.widthHeader) + '%' }}>
                {
                  this.props.detailBody.map((item, key) => (
                    <View style={{ height: this.props.heightRow }} key={key}><Text>{item}</Text></View>
                  ))}
              </View>
            </View>
            {
              this.props.showPhoto ?
                <View style={{ flex: 1, flexDirection: 'row' }}>
                  <View style={{ padding: 10, height: 70, width: '100%' }}>
                    <Button buttonStyle={{ backgroundColor: primary }}
                            title='Ver Documentos'/></View>
                </View>
                : null
            }
          </View> : null
        }
      </View>
    )
  }
}

import React from 'react'
import { Grid, Col, Row } from 'react-native-easy-grid'
import { Text } from 'react-native-elements'
import { View, TouchableHighlight, Platform } from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign'
import { iconCenter } from '../../../assets/Login'

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
                <Text h3>{(this.props.title && this.props.title.length > 0) ? this.props.title : null}</Text>
                <Text h4>{(this.props.subtitle && this.props.title.length > 0) ? this.props.subtitle : null}</Text>
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
            <Row style={this.props.heightBody}>
              <Col size={30}>
                {
                  this.props.detailHeader.map((item, key) => (
                    <Row key={key}><Text style={{fontWeight: 'bold'}}>{item}</Text></Row>
                  ))
                }
              </Col>
              <Col size={70}>
                {
                  this.props.detailBody.map((item, key) => (
                    <Row key={key}><Text>{item}</Text></Row>
                  ))}
              </Col>
            </Row>
          </View> :
          <Row size={0}></Row>
        }
      </View>
    )
  }
}

import React from 'react'
import { View } from 'react-native'
import { Button, Text } from 'react-native-elements'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { Col, Row, Grid } from 'react-native-easy-grid'

export default class UsersHistoryComponent extends React.Component {
  createUser () {

  }

  render () {
    return (
      <Grid style={{ paddingTop: 5, paddingLeft: 5, paddingRight: 5 }}>
        <Col>
          <Row size={10}>
            <Col>
              <Text h3>Historial usuario</Text>
            </Col>
            <Col>
              <Button buttonStyle={{width: 50}} icon={
                <Ionicons name='md-add' size={30}/>
              }></Button>
            </Col>
          </Row>
          <Row size={90}></Row>
        </Col>
      </Grid>
    )
  }
}

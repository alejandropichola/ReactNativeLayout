import React, { PureComponent } from 'react'
import { View, Text, Dimensions, StyleSheet } from 'react-native'
import NetInfo from '@react-native-community/netinfo'
const { width } = Dimensions.get('window')

function MiniOfflineSign () {
  return (
    <View style={style.offlineContainer}>
      <Text style={style.offlineText}>Datos no disponibles</Text>
    </View>
  )
}

class OfflineNoticeComponent extends PureComponent {
  state = {
    isConnected: true
  }
  render () {
    return <MiniOfflineSign/>
  }

  componentDidMount (): void {
    NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectivityChange)
  }

  componentWillUnmount (): void {
    NetInfo.isConnected.removeEventListener('connectionChange')
  }

  handleConnectivityChange = isConnected => {
    if (isConnected) {
      this.setState({isConnected})
    } else {
      this.setState({isConnected})
    }
  }

  render() {
    if (!this.state.isConnected) {
      return <MiniOfflineSign/>
    } else {
      return null;
    }
  }
}

const style = StyleSheet.create({
  offlineContainer: {
    backgroundColor: '#b52424',
    height: 30,
    justifyContent: 'center',
    flexDirection: 'row',
    width,
    position: 'absolute',
    top: 40
  },
  offlineText: {
    color: '#fff'
  }
})

export default OfflineNoticeComponent

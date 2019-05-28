import React from 'react'
import { StyleSheet, Image, View, TouchableOpacity, Alert } from 'react-native'
import {
  createDrawerNavigator,
  createStackNavigator,
  createAppContainer,
  createSwitchNavigator
} from 'react-navigation'
import Ionicons from 'react-native-vector-icons/Ionicons'
import HomeComponent from '../Components/HomeComponent'
import LoginComponent from '../Components/LoginComponent'
import LogOutComponent from '../Components/LogOutComponent'
import ForgotPasswordComponent from '../Components/ForgotPasswordComponent'
import FormCamComponent from '../Components/FormCamComponent'
import UsersComponent from '../Components/UsersComponent'
import { isSignedIn, onSignOut } from '../Services/SESSION'
import OfflineNoticeComponent from '../Components/OfflineNoticeComponent'
import UsersItemComponent from '../Components/Users/UsersItemComponent'
import UsersHistoryComponent from '../Components/Users/UsersHistoryComponent'
class NavigationDrawerStructure extends React.Component {
  constructor (props) {
    super(props)
  }

  login = async () => {
    await onSignOut()
    return await isSignedIn()
  }
  toggleDrawer = () => {
    this.props.navigationProps.toggleDrawer()
  }

  render () {
    return (
      <View>
        <OfflineNoticeComponent/>
        <View style={style.container}>
          <TouchableOpacity onPress={this.toggleDrawer.bind(this)}>
            <Ionicons name='md-menu' size={35} color='white'/>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const OptionTwo = createStackNavigator({
  Home: {
    screen: HomeComponent,
    navigationOptions: ({ navigation }) => ({
      title: 'Inicio',
      headerLeft: <NavigationDrawerStructure navigationProps={navigation}/>,
      headerStyle: {
        backgroundColor: '#5388d0'
      },
      headerTintColor: '#fff'
    })
  }
})

const OptionCamera = createStackNavigator({
  Camera: {
    screen: FormCamComponent,
    navigationOptions: ({ navigation }) => ({
      title: 'Formulario',
      headerLeft: <NavigationDrawerStructure navigationProps={navigation}/>,
      headerStyle: {
        backgroundColor: '#5388d0'
      },
      headerTintColor: '#fff'
    })
  }
})

const OptionUser = createStackNavigator({
  User: {
    screen: UsersHistoryComponent,
    navigationOptions: ({ navigation }) => ({
      title: 'Usuario',
      headerLeft: <NavigationDrawerStructure navigationProps={navigation}/>,
      headerStyle: {
        backgroundColor: '#5388d0'
      },
      headerTintColor: '#fff'
    })
  },
  CreateUser: {
    screen: UsersItemComponent,
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: '#5388d0'
      },
      headerTintColor: '#fff'
    })
  }
}, { initialRouteName: 'User' })

const logOutOption = createStackNavigator({
  logOut: {
    screen: LogOutComponent,
    navigationOptions: ({ navigation }) => ({
      headerLeft: <NavigationDrawerStructure navigationProps={navigation}/>,
      headerStyle: {
        backgroundColor: '#5388d0'
      },
      headerTintColor: '#fff'
    })
  }
})

const OptionOne = createStackNavigator({
  Login: {
    screen: LoginComponent,
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: 'transparent'
      },
      headerTintColor: '#fff'
    })
  },
  ForgotPassword: {
    screen: ForgotPasswordComponent,
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: '#5388d0'
      },
      headerTintColor: '#fff'
    })
  }
}, { initialRouteName: 'Login' })
const DrawerNavigation = createDrawerNavigator({
  ScreenHome: {
    screen: OptionTwo,
    navigationOptions: {
      drawerLabel: 'Inicio',
      drawerIcon: ({ tintColor }) => (
        <Ionicons name="md-home" size={24} style={{ color: tintColor }}/>
      ),
    },
  },
  ScreenCam: {
    screen: OptionCamera,
    navigationOptions: {
      drawerLabel: 'Formulario camara',
      drawerIcon: ({ tintColor }) => (
        <Ionicons name="md-camera" size={24} style={{ color: tintColor }}/>
      )
    }
  },
  ScreenUser: {
    screen: OptionUser,
    navigationOptions: {
      drawerLabel: 'Usuarios',
      drawerIcon: ({ tintColor }) => (
        <Ionicons name='md-person' size={24} style={{ color: tintColor }}/>
      )
    }
  },
  ScreenLogOut: {
    screen: logOutOption,
    navigationOptions: {
      drawerLabel: 'Cerrar sesión',
      drawerIcon: ({ tintColor }) => (
        <Ionicons name='md-log-out' size={24} style={{ color: tintColor }}/>
      )
    }
  }
}, {
  initialRouteName: 'ScreenHome'
})
const navStack = createAppContainer(createSwitchNavigator(
  {
    App: DrawerNavigation,
    Auth: OptionOne,
    LogOut: LogOutComponent
  },
  {
    initialRouteName: 'Auth',
  }
))
const style = StyleSheet.create({
  container: {
    marginLeft: 10,
    marginRight: 10,
  }
})
export default navStack

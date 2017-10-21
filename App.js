import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

import GyroscopeSensor from './components/Gyroscope';
import ImagePickerTest from './components/ImagePicker';
import FacebookButton from './components/FacebookButton';
import login from './helper/facebook';

export default class App extends React.Component {
  state = {
    loggedIn: false,
    username: null,
    email: null,
    profilePicture: null,
  };

  handleLogin = () => {
    login().then(
      (a) => {
        this.setState({
          loggedIn: true,
          username: a.name,
          email: a.email,
          profilePicture: a.picture.data.url,
        })
      }
    );
  };

  handleLogout = () => {
    this.setState({
      loggedIn: false,
      username: null,
      email: null,
      profilePicture: null,
    })
  };

  render() {
    const { loggedIn, username, email, profilePicture } = this.state;
    return (
      <View style={styles.container}>
        { loggedIn &&
          <View style={styles.container}>
            <Text style={styles.labelGyro}>Profile</Text>
            <Text>{username}</Text>
            <Text>{email}</Text>
            <Image source={{uri: profilePicture}} style={{width: 100, height: 100}} />
          </View>
        }
        <Text style={styles.labelGyro}>Gyroscope Sensor</Text>
        <GyroscopeSensor />
        <Text style={styles.labelImage}>Image Picker</Text>
        <ImagePickerTest />
          { loggedIn || <FacebookButton action={this.handleLogin} text={'Login with Facebook'}/> }
          { loggedIn && <FacebookButton action={this.handleLogout} text={`Logout ${username}`}/> }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  labelGyro: {
    fontSize: 24,
    color: '#05668D',
    marginTop: 30
  },
  labelImage: {
    fontSize: 24,
    color: '#05668D',
    marginTop: 30
  }
});

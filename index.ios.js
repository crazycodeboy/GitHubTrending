/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import  Trending from './trending/GitHubTrending'
class GitHubTrending extends Component {
  componentDidMount(){

    this.test('https://github.com/trending');
    this.test('https://github.com/trending/objective-c');
    this.test('https://github.com/trending?since=weekly');
    this.test('https://github.com/trending?since=monthly');
    this.test('https://github.com/trending/unknown?since=monthly');
    this.test('https://github.com/trending/ags-script?since=monthly');
  }
  test(url){
    new Trending().fetchTrending(url)
        .then((data)=>{
      console.log(data);
  }).catch((error)=>{
      console.log(error);
  });
  }

  render() {
    var content='<g-emoji alias="earth_asia" fallback-src="https://assets-cdn.github.com/images/icons/emoji/unicode/1f30f.png">🌏</g-emoji>';
    return (
        <View style={styles.container}>
  <Text style={styles.welcome}>
    Welcome to React Native!
    </Text>
    <Text style={styles.instructions}>
    {content}Live visualization of all the pokemon in your area... and more!
    </Text>
    <Text style={styles.instructions}>
    Press Cmd+R to reload,{'\n'}
    Cmd+D or shake for dev menu
    </Text>
    </View>
  );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('GitHubTrending', () => GitHubTrending);

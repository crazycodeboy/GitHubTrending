/**
 * 从https://github.com/trending获取数据
 * https://github.com/crazycodeboy
 * @flow
 */

import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    TextInput,
    View
} from 'react-native';
import  GitHubTrending from 'GitHubTrending'
export default class test extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: ''
        }
    }

    loadData() {
        this.test('https://github.com/trending');
        // this.test('https://github.com/trending/objective-c');
        // this.test('https://github.com/trending?since=weekly');
        // this.test('https://github.com/trending?since=monthly');
        // this.test('https://github.com/trending/unknown?since=monthly');
        // this.test('https://github.com/trending/ags-script?since=monthly');
    }

    test(url) {
        new GitHubTrending().fetchTrending(url)
            .then((data)=> {
                this.setState({
                    data:JSON.stringify(data),
                })
            }).catch((error)=> {
            this.setState({
                data:error,
            })
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}
                      onPress={()=>this.loadData()}
                >
                    Load Data
                </Text>
                <Text style={styles.input}>
                    {this.state.data}
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
    input: {
        height:200,
        backgroundColor:'gray'
    },
});

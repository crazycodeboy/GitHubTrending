/**
 * 从https://github.com/trending获取数据
 * https://github.com/crazycodeboy
 * @flow
 */

import React, {Component} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import GitHubTrending from 'GitHubTrending'

export default class test extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataArray: [],
            result: "loading"
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
            .then((data) => {
                this.setState({
                    dataArray: data,
                    result: 'success'
                })
            }).catch((error) => {
            this.setState({
                result: "failure",
            })
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.button}
                      onPress={() => this.loadData()}
                >
                    Load Data
                </Text>
                <Text style={styles.input}>
                    {this.state.result}
                </Text>
                <ScrollView>
                    <View style={{flex: 1}}>
                        {
                            this.state.dataArray.map((item, index, arr) => {
                                return <View
                                    style={styles.row}
                                    key={index}>
                                    <Text>fullName:{item.fullName}</Text>
                                    <Text>url:{item.fullName}</Text>
                                    <Text>description:{item.description}</Text>
                                    <Text>language:{item.language}</Text>
                                    <Text>meta:{item.meta}</Text>
                                    <Text>contributors count :{item.contributors.length}</Text>
                                    <Text>contributorsUrl :{item.contributorsUrl}</Text>
                                    <Text>starCount count :{item.starCount}</Text>
                                    <Text>forkCount count :{item.forkCount}</Text>
                                </View>
                            })
                        }
                    </View>
                </ScrollView>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 30

    },
    row: {
        flex: 1,
        marginBottom: 10,
        borderBottomWidth:1,
        borderColor:"gray"
    },
    button: {
        width: 100,
        backgroundColor: 'red',
        padding: 10
    },
    input: {
        backgroundColor: 'gray'
    },
});

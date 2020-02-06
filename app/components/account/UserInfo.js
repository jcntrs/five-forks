import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Avatar } from 'react-native-elements';

const UserInfo = ({ userInfo }) => {
    if (Object.keys(userInfo).length) {
        console.log(userInfo);
    }
    return (
        <View>
            <Text>UserInfo...</Text>
        </View>
    );
}

export default UserInfo;
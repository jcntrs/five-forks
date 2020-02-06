import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { Button } from 'react-native-elements';
import * as firebase from 'firebase';
import UserInfo from '../../components/account/UserInfo';

const UserLogged = () => {

    const [userInfo, setUserInfo] = useState({});

    useEffect(() => {
        const user = firebase.auth().currentUser;
        setUserInfo(user.providerData[0]);
    }, []);

    return (
        <View>
            <UserInfo userInfo={userInfo} />
            <Button
                title="Cerrar sesión"
                onPress={() => firebase.auth().signOut()}
            />
        </View>
    );

}

export default UserLogged;
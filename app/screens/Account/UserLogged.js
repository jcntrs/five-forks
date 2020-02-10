import React, { useState, useEffect, useRef } from 'react';
import { View, Text } from 'react-native';
import { Button } from 'react-native-elements';
import * as firebase from 'firebase';
import UserInfo from '../../components/account/UserInfo';
import Toast from 'react-native-easy-toast';
import Loading from '../../components/Loading';

const UserLogged = () => {

    const [userInfo, setUserInfo] = useState({});
    const [reloadData, setReloadData] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [textLoading, setTextLoading] = useState('');
    const toastRef = useRef();

    useEffect(() => {
        const user = firebase.auth().currentUser;
        setUserInfo(user.providerData[0]);
        setReloadData(false);
    }, [reloadData]);

    return (
        <View>
            <UserInfo
                userInfo={userInfo}
                setReloadData={setReloadData}
                setIsLoading={setIsLoading}
                setTextLoading={setTextLoading}
                toastRef={toastRef}
            />
            <Button
                title="Cerrar sesión"
                onPress={() => firebase.auth().signOut()}
            />
            <Toast ref={toastRef} position="top" opacity={0.7} />
            <Loading text={textLoading} isVisible={isLoading} />
        </View>
    );

}

export default UserLogged;
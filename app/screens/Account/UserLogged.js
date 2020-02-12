import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button } from 'react-native-elements';
import * as firebase from 'firebase';
import UserInfo from '../../components/account/UserInfo';
import Toast from 'react-native-easy-toast';
import Loading from '../../components/Loading';
import OptionsMenu from '../../components/account/OptionsMenu';

const styles = StyleSheet.create({
    viewUserInfo: {
        minHeight: '100%',
        backgroundColor: '#f2f2f2'
    },
    btnCloseSession: {
        marginTop: 30,
        borderRadius: 0,
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#00a680',
        borderBottomWidth: 1,
        borderBottomColor: '#00a680',
        paddingTop: 10,
        paddingBottom: 10
    },
    btnCloseSessionText: {
        color: '#00a680'
    }
});

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
        <View style={styles.viewUserInfo}>
            <UserInfo
                userInfo={userInfo}
                setReloadData={setReloadData}
                setIsLoading={setIsLoading}
                setTextLoading={setTextLoading}
                toastRef={toastRef}
            />
            <OptionsMenu
                userInfo={userInfo}
                setReloadData={setReloadData}
                toastRef={toastRef}
            />
            <Button
                title="Cerrar sesión"
                buttonStyle={styles.btnCloseSession}
                titleStyle={styles.btnCloseSessionText}
                onPress={() => firebase.auth().signOut()}
            />
            <Toast ref={toastRef} position="top" opacity={0.7} />
            <Loading text={textLoading} isVisible={isLoading} />
        </View>
    );

}

export default UserLogged;
import React, { useState } from 'react';
import { SocialIcon } from 'react-native-elements';
import { facebookApi } from '../../utils/Social';
import * as firebase from 'firebase';
import * as Facebook from 'expo-facebook';
import Loading from '../Loading';

const LoginFacebook = ({ toastRef, navigation }) => {

    const [isLoading, setIsLoading] = useState(false);

    const login = async () => {

        await Facebook.initializeAsync(facebookApi.application_id);
        const { type, token } = await Facebook.logInWithReadPermissionsAsync(
            { permissions: facebookApi.permissions }
        );

        if (type === 'success') {
            setIsLoading(true);
            const credentials = firebase.auth.FacebookAuthProvider.credential(token);
            await firebase.auth().signInWithCredential(credentials)
                .then(() => {
                    navigation.navigate('MyAccount');
                })
                .catch(() => {
                    toastRef.current.show('Error accediento a Facebook, intentelo más tarde', 2000);
                });
        } else if (type === 'cancel') {
            toastRef.current.show('Inicio de sesión cancelado', 2000);
        } else {
            toastRef.current.show('Error desconocido, intentelo más tarde', 2000);
        }

        setIsLoading(false);

    }

    return (
        <>
            <SocialIcon
                title="Iniciar sesión con Facebook"
                button
                type="facebook"
                onPress={login}
            />
            <Loading isVisible={isLoading} text="Iniciando sesión" />
        </>
    );

}

export default LoginFacebook;
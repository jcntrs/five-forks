import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Input, Button } from 'react-native-elements';
import * as firebase from 'firebase';
import { reauthenticate } from '../../utils/Api';

const styles = StyleSheet.create({
    view: {
        alignItems: 'center',
        paddingTop: 10,
        paddingBottom: 10
    },
    input: {
        marginBottom: 10,
        marginTop: 10
    },
    btnContainer: {
        marginTop: 10,
        width: '95%'
    },
    btn: {
        backgroundColor: '#00a680'
    }
});

const ChangeEmailForm = ({ email, setIsVisible, setReloadData, toastRef }) => {

    const [newEmail, setNewEmail] = useState('');
    const [password, setPassword] = useState('');
    const [hidePassword, setHidePassword] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState({});

    const updateEmail = () => {
        setError({});
        if (!newEmail || email === newEmail) {
            setError({ email: 'El email no puede ser igual o estar vacio' });
        } else {
            setIsLoading(true);
            reauthenticate(password).then(() => {
                firebase.auth().currentUser.updateEmail(newEmail).then(() => {
                    setIsLoading(false);
                    setReloadData(true);
                    setIsVisible(false);
                    toastRef.current.show('Email actualizado correctamente', 2000);
                }).catch(() => {
                    setError({ email: 'Error al actualizar email' });
                    setIsLoading(false);
                });
            }).catch(() => {
                setError({ password: 'La contraseña no es correcta' });
                setIsLoading(false);
            });
        }
    }

    return (
        <View style={styles.view}>
            <Input
                containerStyle={styles.input}
                placeholder="Correo electrónico"
                defaultValue={email && email}
                onChange={event => setNewEmail(event.nativeEvent.text)}
                rightIcon={{
                    type: 'material-community',
                    name: 'at',
                    color: '#c2c2c2'
                }}
                errorMessage={error.email}
            />
            <Input
                containerStyle={styles.input}
                placeholder="Contraseña"
                password={true}
                secureTextEntry={hidePassword}
                onChange={event => setPassword(event.nativeEvent.text)}
                rightIcon={{
                    type: 'material-community',
                    name: hidePassword ? 'eye-outline' : 'eye-off-outline',
                    color: '#c2c2c2',
                    onPress: () => setHidePassword(!hidePassword)
                }}
                errorMessage={error.password}
            />
            <Button
                containerStyle={styles.btnContainer}
                buttonStyle={styles.btn}
                title="Cambiar email"
                onPress={updateEmail}
                loading={isLoading}
            />
        </View>
    );

}

export default ChangeEmailForm;
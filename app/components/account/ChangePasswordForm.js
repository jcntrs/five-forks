import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
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
        marginBottom: 10
    },
    btnContainer: {
        marginTop: 20,
        width: '95%'
    },
    btn: {
        backgroundColor: '#00a680'
    }
});

const ChangePasswordForm = ({ setIsVisible, toastRef }) => {

    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [repeatNewPassword, setRepeatNewPassword] = useState('');
    const [error, setError] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [hideCurrentPassword, setHideCurrentPassword] = useState(true);
    const [hideNewPassword, setHideNewPassword] = useState(true);
    const [hideRepeatNewPassword, setHideRepeatNewPassword] = useState(true);

    const updatePassword = () => {
        setError({});
        if (!currentPassword || !newPassword || !repeatNewPassword) {
            let objError = {};
            !currentPassword && (objError.currentPassword = 'Debe completar este campo');
            !newPassword && (objError.newPassword = 'Debe completar este campo');
            !repeatNewPassword && (objError.repeatNewPassword = 'Debe completar este campo');
            setError(objError);
        } else {
            if (newPassword !== repeatNewPassword) {
                setError({
                    newPassword: 'Las nuevas contraseñas no coinciden',
                    repeatNewPassword: 'Las nuevas contraseñas no coinciden'
                });
            } else {
                setIsLoading(true);
                reauthenticate(currentPassword).then(() => {
                    firebase.auth().currentUser.updatePassword(newPassword).then(() => {
                        setIsLoading(false);
                        setIsVisible(false);
                        toastRef.current.show('Contraseña actualizada correctamente', 2000);
                        setTimeout(() => {
                            firebase.auth().signOut();
                        }, 3000);
                    }).catch(() => {
                        setError({ general: 'Error al actualizar la contraseña' });
                        setIsLoading(false);
                    });
                }).catch(() => {
                    setError({ currentPassword: 'La contraseña no es correcta' });
                    setIsLoading(false);
                });
            }
        }
    }

    return (
        <View style={styles.view}>
            <Input
                containerStyle={styles.input}
                placeholder="Contraseña actual"
                password={true}
                secureTextEntry={hideCurrentPassword}
                onChange={event => setCurrentPassword(event.nativeEvent.text)}
                rightIcon={{
                    type: 'material-community',
                    name: hideCurrentPassword ? 'eye-outline' : 'eye-off-outline',
                    color: '#c2c2c2',
                    onPress: () => setHideCurrentPassword(!hideCurrentPassword)
                }}
                errorMessage={error.currentPassword}
            />
            <Input
                containerStyle={styles.input}
                placeholder="Nueva contraseña"
                password={true}
                secureTextEntry={hideNewPassword}
                onChange={event => setNewPassword(event.nativeEvent.text)}
                rightIcon={{
                    type: 'material-community',
                    name: hideNewPassword ? 'eye-outline' : 'eye-off-outline',
                    color: '#c2c2c2',
                    onPress: () => setHideNewPassword(!hideNewPassword)
                }}
                errorMessage={error.newPassword}
            />
            <Input
                containerStyle={styles.input}
                placeholder="Repetir contraseña"
                password={true}
                secureTextEntry={hideRepeatNewPassword}
                onChange={event => setRepeatNewPassword(event.nativeEvent.text)}
                rightIcon={{
                    type: 'material-community',
                    name: hideRepeatNewPassword ? 'eye-outline' : 'eye-off-outline',
                    color: '#c2c2c2',
                    onPress: () => setHideRepeatNewPassword(!hideRepeatNewPassword)
                }}
                errorMessage={error.repeatNewPassword}
            />
            <Button
                title="Cambiar contraseña"
                containerStyle={styles.btnContainer}
                buttonStyle={styles.btn}
                onPress={updatePassword}
                loading={isLoading}
            />
            <Text>{error.general}</Text>
        </View>
    );

}

export default ChangePasswordForm;
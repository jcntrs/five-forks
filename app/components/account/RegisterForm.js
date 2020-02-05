import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Input, Icon, Button } from 'react-native-elements';
import { validateEmail } from '../../utils/Validation';
import * as firebase from 'firebase';

const styles = StyleSheet.create({
    formContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 30
    },
    inputForm: {
        width: '100%',
        marginTop: 20
    },
    iconRight: {
        color: '#c1c1c1'
    },
    btnContainerRegister: {
        marginTop: 20,
        width: '95%'
    },
    btnRegister: {
        backgroundColor: '#00a680'
    }
});

const RegisterForm = () => {

    const [hidePassword, setHidePassword] = useState(true);
    const [hideRepeatPassword, setHideRepeatPassword] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');

    const register = async () => {

        let error = false;

        !validateEmail(email) ? error = true : null;
        password.trim().length === 0 || repeatPassword.trim().length === 0 ? error = true : null;
        password !== repeatPassword ? error = true : null;

        if (!error) {
            await firebase.auth().createUserWithEmailAndPassword(email, password)
                .then(() => {
                    console.log('Usuario creado exitosamente');
                })
                .catch((error) => {
                    console.log('Error al crear usaurio', error)
                });
        }

    }

    return (
        <View style={styles.formContainer}>
            <Input
                placeholder="Correo electronico"
                containerStyle={styles.inputForm}
                onChange={event => setEmail(event.nativeEvent.text)}
                rightIcon={
                    <Icon
                        type="material-community"
                        name="at"
                        iconStyle={styles.iconRight}
                    />
                }
            />
            <Input
                placeholder="Contraseña"
                password={true}
                secureTextEntry={hidePassword}
                containerStyle={styles.inputForm}
                onChange={event => setPassword(event.nativeEvent.text)}
                rightIcon={
                    <Icon
                        type="material-community"
                        name={hidePassword ? 'eye-outline' : 'eye-off-outline'}
                        iconStyle={styles.iconRight}
                        onPress={() => setHidePassword(!hidePassword)}
                    />
                }
            />
            <Input
                placeholder="Repetir contraseña"
                password={true}
                secureTextEntry={hideRepeatPassword}
                containerStyle={styles.inputForm}
                onChange={event => setRepeatPassword(event.nativeEvent.text)}
                rightIcon={
                    <Icon
                        type="material-community"
                        name={hideRepeatPassword ? 'eye-outline' : 'eye-off-outline'}
                        iconStyle={styles.iconRight}
                        onPress={() => setHideRepeatPassword(!hideRepeatPassword)}
                    />
                }
            />
            <Button
                title="Registrarse"
                containerStyle={styles.btnContainerRegister}
                buttonStyle={styles.btnRegister}
                onPress={register}
            />
        </View>
    );

}

export default RegisterForm;
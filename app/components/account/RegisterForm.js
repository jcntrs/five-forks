import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Input, Icon, Button } from 'react-native-elements';
import { validateEmail } from '../../utils/Validation';
import * as firebase from 'firebase';
import Loading from '../Loading';
import { withNavigation } from 'react-navigation';

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

const RegisterForm = ({ toastRef, navigation }) => {

    const [hidePassword, setHidePassword] = useState(true);
    const [hideRepeatPassword, setHideRepeatPassword] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [creatingAccount, setCreatingAccount] = useState(false);

    const register = async () => {

        setCreatingAccount(true);
        let error = false;

        if (!validateEmail(email)) {
            error = true;
            toastRef.current.show('El email no es válido', 2000);
        } else if (password.trim().length < 6) {
            error = true;
            toastRef.current.show('La contraseña debe tener al menos 6 caracteres', 2000);
        } else if (repeatPassword.trim().length < 6) {
            error = true;
            toastRef.current.show('La confirmación de contraseña debe tener al menos 6 caracteres', 2000);
        } else if (password !== repeatPassword) {
            error = true;
            toastRef.current.show('Contraseñas no coinciden', 2000);
        }

        if (!error) {
            await firebase.auth().createUserWithEmailAndPassword(email, password)
                .then(() => {
                    navigation.navigate('MyAccount');
                })
                .catch((error) => {
                    console.log(error);
                    toastRef.current.show('Error al crear usaurio', 2000);
                });
        }

        setCreatingAccount(false);

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
            <Loading isVisible={creatingAccount} text="Creando cuenta" />
        </View>
    );

}

export default withNavigation(RegisterForm);
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Input, Icon, Button } from 'react-native-elements';
import { validateEmail } from '../../utils/Validation';
import Loading from '../Loading';

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
    btnContainerLogin: {
        marginTop: 20,
        width: '95%'
    },
    btnLogin: {
        backgroundColor: '#00a680'
    }
});

const LoginForm = ({ toastRef }) => {

    const [hidePassword, setHidePassword] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loggingIn, setLoggingIn] = useState(false);

    const login = () => {

        setLoggingIn(true);
        let error = false;

        if (!validateEmail(email)) {
            error = true;
            toastRef.current.show('El email no es válido', 2000);
        } else if (password.trim().length < 6) {
            error = true;
            toastRef.current.show('La contraseña debe tener al menos 6 caracteres', 2000);
        }

        if (!error) {
            console.log('Éxito');
        }

        setLoggingIn(false);

    }

    return (
        <View style={styles.formContainer}>
            <Input
                containerStyle={styles.inputForm}
                placeholder="Correo electrónico"
                onChange={event => setEmail(event.nativeEvent.text)}
                rightIcon={
                    <Icon
                        iconStyle={styles.iconRight}
                        type="material-community"
                        name="at"
                    />
                }
            />
            <Input
                containerStyle={styles.inputForm}
                placeholder="Contraseña"
                secureTextEntry={hidePassword}
                onChange={event => setPassword(event.nativeEvent.text)}
                rightIcon={
                    <Icon
                        iconStyle={styles.iconRight}
                        type="material-community"
                        name={hidePassword ? 'eye-outline' : 'eye-off-outline'}
                        onPress={() => setHidePassword(!hidePassword)}
                    />
                }
            />
            <Button
                containerStyle={styles.btnContainerLogin}
                buttonStyle={styles.btnLogin}
                title="Iniciar sesión"
                onPress={login}
            />
            <Loading isVisible={loggingIn} text="Iniciando sesión" />
        </View>
    );

}

export default LoginForm;
import React, { useRef } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import RegisterForm from '../../components/account/RegisterForm';
import Toast from 'react-native-easy-toast';

const styles = StyleSheet.create({
    logo: {
        width: "100%",
        height: 150,
        marginTop: 20
    },
    viewForm: {
        marginRight: 40,
        marginLeft: 40
    }
});

const Register = () => {

    const toastRef = useRef();

    return (
        <KeyboardAwareScrollView enableOnAndroid extraScrollHeight={20}>
            <Image
                source={require("../../../assets/img/five-forks.png")}
                style={styles.logo}
                resizeMode="contain"
            />
            <View style={styles.viewForm}>
                <RegisterForm toastRef={toastRef} />
            </View>
            <Toast ref={toastRef} position="top" opacity={0.7} />
        </KeyboardAwareScrollView>
    );

}


export default Register;
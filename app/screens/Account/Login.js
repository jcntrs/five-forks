import React from 'react';
import { StyleSheet, ScrollView, View, Text, Image } from 'react-native';
import { Divider } from 'react-native-elements';

const styles = StyleSheet.create({
    logo: {
        width: "100%",
        height: 150,
        marginTop: 20
    },
    viewContainer: {
        marginRight: 40,
        marginLeft: 40
    },
    divider: {
        backgroundColor: "#00a680",
        margin: 40
    },
    textRegister: {
        marginTop: 15,
        marginLeft: 10,
        marginRight: 10
    },
    btnRegister: {
        color: "#00a680",
        fontWeight: "bold"
    }
});

const Login = props => {

    const { navigation } = props;

    return (
        <ScrollView>
            <Image
                source={require("../../../assets/img/five-forks.png")}
                style={styles.logo}
                resizeMode="contain"
            />
            <View style={styles.viewContainer}>
                <Text>Formulario</Text>
                <CreateAccount navigation={navigation} />
            </View>
            <Divider style={styles.divider} />
            <View style={styles.viewContainer}>
                <Text>Login Facebook</Text>
            </View>
        </ScrollView>
    );

}

const CreateAccount = ({ navigation }) => (
    <View>
        <Text style={styles.textRegister}>¿Aún no tienes una cuenta?</Text>
        <Text style={styles.btnRegister} onPress={() => navigation.navigate('Register')}>Registrate</Text>
    </View>
);


export default Login;
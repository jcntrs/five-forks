import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Input, Button } from 'react-native-elements';
import * as firebase from 'firebase';

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
        marginTop: 20
    },
    btn: {
        backgroundColor: '#00a680'
    }
});

const ChangeNameForm = ({ displayName, setIsVisible, setReloadData, toastRef }) => {

    const [newDisplayName, setNewDisplayName] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const updateName = () => {
        console.log('Nombre actualizado');
    }

    return (
        <View style={styles.view}>
            <Input
                containerStyle={styles.input}
                placeholder="Nombre"
                defaultValue={displayName && displayName}
                //onChange={....}
                rightIcon={{
                    type: 'material-community',
                    name: 'account-circle-outline',
                    color: '#c2c2c2'
                }}
            //errorMessage={}
            />
            <Button
                title="Cambiar nombre"
                containerStyle={styles.btnContainer}
                buttonStyle={styles.btn}
                onPress={updateName}
            //loading={}
            />
        </View>
    );

}

export default ChangeNameForm;
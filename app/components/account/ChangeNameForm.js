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
        marginTop: 20,
        width: '95%'
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
        if (!newDisplayName) {
            setError('El nombre del usuario no ha cambiado');
        } else {
            setError(null);
            setIsLoading(true);
            const update = {
                displayName: newDisplayName
            }
            firebase.auth().currentUser.updateProfile(update)
                .then(() => {
                    setIsLoading(false);
                    setReloadData(true);
                    toastRef.current.show('Nombre actualizado corretamente', 2000);
                    setIsVisible(false);
                })
                .catch(() => {
                    setError('Error al actualizar el nombre');
                    setIsLoading(false);
                });
        }
    }

    return (
        <View style={styles.view}>
            <Input
                containerStyle={styles.input}
                placeholder="Nombre"
                defaultValue={displayName && displayName}
                onChange={event => setNewDisplayName(event.nativeEvent.text)}
                rightIcon={{
                    type: 'material-community',
                    name: 'account-circle-outline',
                    color: '#c2c2c2'
                }}
                errorMessage={error}
            />
            <Button
                title="Cambiar nombre"
                containerStyle={styles.btnContainer}
                buttonStyle={styles.btn}
                onPress={updateName}
                loading={isLoading}
            />
        </View>
    );

}

export default ChangeNameForm;
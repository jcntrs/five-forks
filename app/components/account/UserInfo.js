import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Avatar } from 'react-native-elements';
import * as firebase from 'firebase';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import { YellowBox } from 'react-native';

const styles = StyleSheet.create({
    viewUserInfo: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        backgroundColor: '#f2f2f2',
        paddingTop: 30,
        paddingBottom: 30
    },
    avatarUserInfo: {
        marginRight: 20
    },
    displayName: {
        fontWeight: 'bold'
    },
    viewCenter: {
        alignItems: 'center'
    }
});

const UserInfo = props => {

    YellowBox.ignoreWarnings(['Setting a timer']);

    const { userInfo: { uid, displayName, email, photoURL }, setReloadData, setIsLoading, setTextLoading, toastRef } = props;

    const editAvatar = async () => {
        const resultPermission = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        const resultPermissionCamera = resultPermission.permissions.cameraRoll.status;
        if (resultPermissionCamera === 'denied') {
            toastRef.current.show('Es necesario aceptar los permisos de la galeria', 2000);
        } else {
            const result = await ImagePicker.launchImageLibraryAsync({
                allowsEditing: true,
                aspect: [4, 3]
            });
            if (result.cancelled) {
                toastRef.current.show('Has cerrado la galria de imágenes antes de seleccionar alguna', 2000);
            } else {
                uploadImage(result.uri, uid).then(() => {
                    updatePhotoUrl(uid);
                });
            }
        }
    }

    const uploadImage = async (uri, imageName) => {
        setTextLoading('Actualizando Avatar');
        setIsLoading(true);
        const response = await fetch(uri);
        const blob = await response.blob();
        const ref = firebase.storage().ref().child(`avatar/${imageName}`);
        return ref.put(blob);
        //console.log(JSON.stringify(blob));
    }

    const updatePhotoUrl = uid => {
        firebase.storage().ref(`avatar/${uid}`).getDownloadURL()
            .then(async result => {
                const update = {
                    photoURL: result
                }
                await firebase.auth().currentUser.updateProfile(update);
                setReloadData(true);
                setIsLoading(false);
            })
            .catch(() => {
                toastRef.current.show('Error al recuperar el avatar del servidor', 2000);
            });
    }

    return (
        <View style={styles.viewUserInfo}>
            <Avatar
                rounded
                size="large"
                showEditButton
                onEditPress={editAvatar}
                containerStyle={styles.avatarUserInfo}
                source={{ uri: photoURL ? photoURL : 'https://api.adorable.io/avatars/266/abott@adorable.png' }}
            />
            <View style={styles.viewCenter}>
                <Text style={styles.displayName}>
                    {displayName ? displayName : 'Anónimo'}
                </Text>
                <Text>{email ? email : 'Sesión Facebook'}</Text>
            </View>
        </View>
    );

}

export default UserInfo;
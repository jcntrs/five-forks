import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Avatar } from 'react-native-elements';
import * as firebase from 'firebase';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';

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

    const { userInfo: { uid, displayName, email, photoURL } } = props;

    const editAvatar = async () => {
        const resultPermission = await Permissions.askAsync(Permissions.CAMERA_ROLL);
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
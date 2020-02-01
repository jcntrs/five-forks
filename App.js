import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button, Icon } from 'react-native-elements';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Five Forks</Text>
      <Button
        title="Button with icon component"
        loading={false}
        icon={<Icon type="material-community" name="check-outline" size={15} color="white" />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

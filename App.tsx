import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import Constants from 'expo-constants'
import Routes from './src/routes';

export default function App() {
  return (
      <SafeAreaView style={styles.container}>
        <Routes/>
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container : {
    flex : 1,
    paddingTop : Constants.statusBarHeight,
    backgroundColor : 'rgba(7, 26, 93, 255)'
  }
});
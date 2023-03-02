import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text } from 'react-native';
import Home from './src/screens/Home'

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar animated={true}
        backgroundColor="#B1B2FF"
      />
      <Home />
      <View style={styles.footer_view}>
        <Text style={styles.footer_text}>Product made by AnhFang 2022 </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EEF1FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  footer_view: {
    backgroundColor: '#B1B2FF',
    width: '100%',
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  footer_text: {
    color: '#EEEEEE',
    fontWeight: '300',
  },
});

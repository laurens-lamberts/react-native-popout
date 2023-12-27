import React from 'react';
import {SafeAreaView, StatusBar} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import Overview from './src/screens/Overview';
import {SafeAreaProvider} from 'react-native-safe-area-context';

const App = () => {
  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={{flex: 1, backgroundColor: 'black'}}>
        <SafeAreaView style={{flex: 1}}>
          <StatusBar barStyle={'light-content'} backgroundColor={'#fff'} />
          <Overview />
        </SafeAreaView>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
};

export default App;

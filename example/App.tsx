import React from 'react';
import {SafeAreaView, StatusBar} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import Example from 'react-native-popout-transition';
import {SafeAreaProvider} from 'react-native-safe-area-context';

const App = () => {
  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={{flex: 1, backgroundColor: 'black'}}>
        <SafeAreaView style={{flex: 1}}>
          <StatusBar barStyle={'light-content'} backgroundColor={'#fff'} />
          <Example />
        </SafeAreaView>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
};

export default App;

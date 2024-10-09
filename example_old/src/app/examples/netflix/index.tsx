import React from 'react';
import {StatusBar} from 'react-native';
import PopoutRootView from 'react-native-popout';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Overview from './Overview';

const Netflix = () => {
  return (
    <SafeAreaProvider
      style={{
        backgroundColor: 'black',
      }}>
      <StatusBar barStyle={'light-content'} backgroundColor={'#fff'} />
      <PopoutRootView>
        <Overview />
      </PopoutRootView>
    </SafeAreaProvider>
  );
};

export default Netflix;

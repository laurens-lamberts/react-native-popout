import Minimal from './src/app/examples/minimal';
import Netflix from './src/app/examples/netflix';
import AppStore from './src/app/examples/appstore';
import Testing from './src/app/examples/testing';
import Springboard from './src/app/examples/springboard';
import {Pressable, Text, View} from 'react-native';
import {useContext, useState} from 'react';

const hitSlop = {top: 10, bottom: 10, left: 10, right: 10};

// Examples;
// - Netflix
// - Minimal
// - AppStore
// - Testing
// - Springboard

const App = () => {
  const [activeExample, setActiveExample] = useState('Netflix');

  return (
    <View style={{flex: 1}}>
      <View style={{flex: 1}}>
        {activeExample === 'Netflix' && <Netflix />}
        {activeExample === 'Minimal' && <Minimal />}
        {activeExample === 'AppStore' && <AppStore />}
        {activeExample === 'Testing' && <Testing />}
        {activeExample === 'Springboard' && <Springboard />}
      </View>
      <View
        style={{
          width: '100%',
          height: 80,
          backgroundColor: 'rgba(0,0,0,0.5)',
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          alignItems: 'center',
        }}>
        <Pressable
          onPress={() => setActiveExample('Netflix')}
          hitSlop={hitSlop}>
          <Text style={{color: 'white'}}>Netflix</Text>
        </Pressable>
        <Text style={{color: 'white'}}>|</Text>
        {/* <Pressable onPress={() => setActiveExample('Minimal')}>
          <Text style={{color: 'white'}}>Minimal</Text>
        </Pressable> */}
        <Pressable
          onPress={() => setActiveExample('AppStore')}
          hitSlop={hitSlop}>
          <Text style={{color: 'white'}}>AppStore</Text>
        </Pressable>
        <Text style={{color: 'white'}}>|</Text>
        <Pressable
          onPress={() => setActiveExample('Testing')}
          hitSlop={hitSlop}>
          <Text style={{color: 'white'}}>Testing</Text>
        </Pressable>
        <Text style={{color: 'white'}}>|</Text>
        <Pressable
          onPress={() => setActiveExample('Springboard')}
          hitSlop={hitSlop}>
          <Text style={{color: 'white'}}>Springboard</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default App;

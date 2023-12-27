import React from 'react';
import {Pressable, Text} from 'react-native';

const CloseButton = ({hide}) => {
  return (
    <Pressable
      onPress={() => {
        hide({
          dragX: 0,
          dragY: 0,
          scale: 1,
        });
      }}
      style={{
        borderRadius: 18,
        height: 36,
        width: 36,
        backgroundColor: '#333',
        position: 'absolute',
        top: 6,
        right: 6,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text
        style={{
          color: 'white',
          fontSize: 24,
          fontWeight: 'bold',
          top: -2, // ?
          left: 1, // ?
        }}>
        ×
      </Text>
    </Pressable>
  );
};

export default CloseButton;

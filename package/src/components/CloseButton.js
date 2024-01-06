import React, { useContext } from 'react';
import { Pressable, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { PopoutContext } from './PopoutRootView';
const CloseButton = ({ hide }) => {
    const { overlayUnderNotch } = useContext(PopoutContext);
    // TODO: refactor into hook, together with the one in OverlayBackdrop.tsx
    // const { overlayUnderNotch } = useContext(PopoutContext);
    const insets = useSafeAreaInsets(); // TODO: make more generic
    // const insets = useInsets
    //   ? safeAreaInsets
    //   : { top: 0, bottom: 0, left: 0, right: 0 };
    return (<Pressable onPress={() => {
            hide();
        }} style={{
            borderRadius: 18,
            height: 36,
            width: 36,
            backgroundColor: '#333',
            position: 'absolute',
            top: overlayUnderNotch ? insets.top : 6,
            right: overlayUnderNotch ? insets.top / 2 : 6,
            justifyContent: 'center',
            alignItems: 'center',
        }}>
      <Text style={{
            color: 'white',
            fontSize: 24,
            fontWeight: 'bold',
            top: -2,
            left: 1, // ?
        }}>
        ×
      </Text>
    </Pressable>);
};
export default CloseButton;

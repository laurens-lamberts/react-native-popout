import React, {PropsWithChildren} from 'react';
import {ScrollView, ScrollViewProps} from 'react-native';
import {ENABLE_DEBUG_COLORS} from '../config/settings';

const Row = ({children, scrollEnabled}: PropsWithChildren<ScrollViewProps>) => {
  return (
    <ScrollView
      horizontal
      style={{
        backgroundColor: ENABLE_DEBUG_COLORS ? 'yellow' : undefined,
        marginHorizontal: -12,
        // overflow: 'visible',
        height: 160,
      }}
      contentContainerStyle={{
        gap: 12,
        paddingLeft: 24,
        marginHorizontal: -12,
        flexDirection: 'row',
        backgroundColor: ENABLE_DEBUG_COLORS ? 'red' : undefined,
      }}
      scrollEnabled={scrollEnabled}
      showsHorizontalScrollIndicator={false}>
      {children}
    </ScrollView>
  );
};

export default Row;

import React, {PropsWithChildren} from 'react';
import {ScrollView, ScrollViewProps} from 'react-native';

const Row = ({
  children,
  scrollEnabled,
  style,
}: PropsWithChildren<ScrollViewProps>) => {
  return (
    <ScrollView
      horizontal
      style={[
        {
          marginHorizontal: -12,
          // overflow: 'visible',
          height: 160,
        },
        style,
      ]}
      contentContainerStyle={{
        gap: 12,
        paddingLeft: 24,
        marginHorizontal: -12,
        flexDirection: 'row',
      }}
      scrollEnabled={scrollEnabled}
      showsHorizontalScrollIndicator={false}>
      {children}
    </ScrollView>
  );
};

export default Row;

import React from 'react';
import {Text, View, useWindowDimensions} from 'react-native';
import {PopoutTile} from 'react-native-popout';
import {DATA, ROWS} from '../../content/content';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const APP_ICON_SIZE_SCREENWIDTH_FACTOR = 0.175; // the app icon size as a factor over the screenWidth. The horizontal padding will be calculated based on this value. max: 0.22
// const APP_VERTICAL_PADDING_FACTOR = 1.5; // the vertical padding between apps as a factor over the horizontal padding.

const Overview = () => {
  const insets = useSafeAreaInsets();
  const {width: screenWidth} = useWindowDimensions();

  const appIconSize = screenWidth * APP_ICON_SIZE_SCREENWIDTH_FACTOR;

  // 4 is the amount of icons in a row.
  // 5 is the total amount of spaces horizontally. (3 between the apps, 2 on the sides)
  const horizontalPadding = (screenWidth - appIconSize * 4) / 5;

  return (
    <View style={{gap: 20, marginTop: insets.top + 30}}>
      {ROWS.map((rowData, id) => (
        <View
          key={rowData.id}
          style={{
            // top: id * (appIconSize * 0.3),
            flexDirection: 'row',
            marginHorizontal: horizontalPadding,
            gap: horizontalPadding,
          }}>
          {DATA.testCollection
            .slice(0, 4)
            // .sort(() => Math.random() - 0.5)
            .map((item, index) => (
              <View
                key={item.id + rowData.id}
                style={{
                  alignItems: 'center',
                  width: appIconSize,
                }}>
                <PopoutTile
                  style={{
                    width: appIconSize,
                    height: appIconSize,
                    borderRadius: 16,
                  }}
                  key={item.id}
                  item={item}
                  overlayComponent={<View style={{margin: 20}}></View>}
                />
                <Text
                  style={{
                    color: 'white',
                    marginTop: 6,
                    width: appIconSize + 20, // Increase the width to allow text to break out
                  }}
                  numberOfLines={1}>
                  {item.title}
                </Text>
              </View>
            ))}
        </View>
      ))}
    </View>
  );
};

export default Overview;

import React, {useContext} from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import {
  PopoutTile,
  PopoutContext,
  PopoutOverlayContent,
} from 'react-native-popout';
import Row from '../../components/Row';
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

  const {onElementTap, setOverlayComponent} = useContext(PopoutContext);

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
                  // justifyContent: 'center',
                  alignItems: 'center',
                  width: appIconSize,
                  overflow: 'visible',
                }}>
                <PopoutTile
                  style={{
                    width: appIconSize,
                    height: appIconSize,
                    borderRadius: 16,
                  }}
                  key={item.id}
                  item={item}
                  onTap={viewRef => {
                    setOverlayComponent(<View style={{margin: 20}}></View>);
                    onElementTap(viewRef, DATA.testCollection[index]);
                  }}
                  // isOpened={elementOpened?.id === item.id}
                />
                <Text style={{color: 'white', marginTop: 6}} numberOfLines={1}>
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

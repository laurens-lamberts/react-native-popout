# react-native-popout

> [!WARNING]  
> This library is still in development. It is not yet ready for production use.

A popout-style transition using [reanimated](https://www.reanimated2.com), [react-native-skia](https://github.com/Shopify/react-native-skia) and [react-native-gesture-handler](https://docs.swmansion.com/react-native-gesture-handler/)

https://github.com/laurens-lamberts/react-native-popout/assets/48212886/4006d669-8618-4812-b8f3-939860a3cab2

## Features

- Smooth transitions thanks to Reanimated and react-native-skia.
- Custom renderings in both the tile and popout.
- Popout animates from- and to the tile.
- Drag the popout more than 200px down to close it.
- Optional blur of the entire screen behind the popout.
- Optional blurred image background for the popout.

Libraries used;

- [reanimated](https://www.reanimated2.com) for the transition animation
- [react-native-skia](https://github.com/Shopify/react-native-skia) for image effects.
- [react-native-gesture-handler](https://docs.swmansion.com/react-native-gesture-handler/) for dragging the popout
- [react-native-safe-area-context](https://github.com/th3rdwave/react-native-safe-area-context) to ensure the popout renders below a notch, if applicable

Inspired by the [`Netflix`](https://apps.apple.com/us/app/netflix/id363590051), [`Balance`](https://apps.apple.com/to/app/balance-meditation-sleep/id1361356590) and [`App Store`](https://www.apple.com/app-store/) iOS apps.

I find this transition to be natural and visually pleasing. Using the `reanimated` library, it is possible to create a smooth transition between the tile and the popout. Using the `react-native-skia` library, it is possible to add a blur effect to the background of the popout. This makes the popout stand out from the rest of the app, and makes it easier to focus on the popout. The 'react-native-gesture-handler' library is used to make the popout draggable. This makes it possible to close the popout by dragging it down.

## Installation

To install the library, navigate to your project directory and run:

```bash
npm install --save react-native-popout
```

or if you are using Yarn:

```bash
yarn add react-native-popout
```

and if not yet present in your project, install the following packages;

```bash
yarn add react-native-reanimated react-native-gesture-handler react-native-safe-area-context @shopify/react-native-skia
```

Make sure you add the following to your info.plist file `dict`, in order to support 120hz ProMotion iPhone performance:

```xml
<key>CADisableMinimumFrameDurationOnPhone</key>
<true/>
```

## Usage

API specification can be found [here](API.md).

Here's a minimal example of how to use the library:

### Your App.tsx / index.js file

```typescript
import PopoutRootView from 'react-native-popout';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Screen from './Screen';

const App = () => {
  return (
    <SafeAreaProvider style={{backgroundColor: 'black'}}>
      <PopoutRootView>
        <Screen />
      </PopoutRootView>
    </SafeAreaProvider>
  );
};

export default App;
```

### Your Screen.tsx file (or a name of your choice)

```typescript
import React, {useContext} from 'react';
import {SafeAreaView, ScrollView, Text, View} from 'react-native';
import {PopoutTile, PopoutContext, PopoutTileType} from 'react-native-popout';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const TEST_ITEM = {
  id: 0,
  title: 'Test',
  image: 'https://images.unsplash.com/photo-1682685797208-c741d58c2eff?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
}: PopoutTileType;

const Screen = () => {
  const insets = useSafeAreaInsets();
  const {onElementTap, setOverlayComponent} =
    useContext(PopoutContext);

  return (
    <View style={{paddingTop: insets.top}}>
      <PopoutTile
        item={TEST_ITEM}
        onTap={viewRef => {
          setOverlayComponent(
            <View style={{margin: 20}}>
              <Text style={{color: 'white'}}>{item.title}</Text>
            </View>,
          );
          onElementTap(viewRef, TEST_ITEM);
        }}
      />
    </View>
  );
};

export default Screen;
```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)

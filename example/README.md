# react-native-popout-transition

To be converted to a generic library so that it can be used in all sorts of projects. Currently an example project for a tile-popout transition.

TODO: enter video here

Features;

- Custom renderings in both the tile and popout.
- Popout animates from- and to the tile.
- Drag the popout more than 200px down to close it.
- Optional blur of the entire screen behind the popout.
- Optional blurred image background for the popout.

Libraries used;

- `reanimated` (for the transition animation)
- `react-native-skia` (for image effects).
- `react-native-gesture-handler` (for dragging the popout)
- `react-native-safe-area-context` (to ensure the popout renders below a notch, if applicable)

Inspired by the `Netflix`, `Balance` and `App Store` iOS apps.

I find this transition to be natural and visually pleasing. Using the `reanimated` library, it is possible to create a smooth transition between the tile and the popout. Using the `react-native-skia` library, it is possible to add a blur effect to the background of the popout. This makes the popout stand out from the rest of the app, and makes it easier to focus on the popout. The 'react-native-gesture-handler' library is used to make the popout draggable. This makes it possible to close the popout by dragging it down.

## Getting Started

### Android

Run to start the example;

```bash
yarn android
```

### iOS

Make sure you added the following to your info.plist file `dict`, in order to support 120hz ProMotion iPhone performance:

```xml
<key>CADisableMinimumFrameDurationOnPhone</key>
<true/>
```

Run to start the example;

```bash
yarn ios
```

## Steps to take to convert to a library

1. Complete the transition so that it works smoothly on both iOS and Android.
2. Tweak the easing of the transition to make it feel more natural.
3. Make a generic `PopoutTile` component that can be used to render the tile.
4. Add a way to pass in a custom component to `PopoutTile` to be rendered in the tile.
5. Add a way to pass in a custom component to `PopoutTile` to be rendered in the popout.
6. Make a `PopoutRootView` component to wrap around your entire application. This facilitates the transition to an absolute overlay. Provide it variables to control the transition (border radius, behind popout blurring, popout blurred image background true/false, ...).
7. Calculate aspect ratio based on width and height of the tile. Currently only width is used, so only tiles larger in height than width are working properly.
8. Image preloading or another solution to prevent the image from flashing in the popout.
9. turn the repo into a library.
   1. start from a [library template](https://reactnative.dev/docs/native-modules-setup)
   2. add reanimated and skia as `peerDependencies`
   3. move the original example into an example folder
10. Publish the library to npm.

## Troubleshooting

TODO

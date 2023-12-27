Example project for a tile-popout transition using reanimated and react-native-skia blurs.
To be converted to a generic library so that it can be used in all sorts of projects.

# Getting Started

To run the example;

### For Android

```bash
yarn android
```

### For iOS

Make sure you added the following to your info.plist file `dict``, in order to support 120hz promotion performance:

```xml
	<key>CADisableMinimumFrameDurationOnPhone</key>
	<true/>
```

```bash
yarn ios
```

# Steps to take to convert to a library

1. Complete the transition so that it works smoothly on both iOS and Android.
2. Tweak the easing of the transition to make it feel more natural.
3. Make a generic `tile` component that can be used to render the tile.
4. Add a way to pass in a custom component to `tile` to be rendered in the tile.
5. Add a way to pass in a custom component to `tile` to be rendered in the popout.
6. Make a wrapper component to wrap around your entire application. This facilitates the transition to an absolute overlay. Provide it variables to control the transition (border radius, blurring true/false, ...).
7. Calculate aspect ratio based on width and height of the tile. Currently only width is used, so only tiles larger in height than width are working properly.
8. Image preloading or another solution to prevent the image from flashing in the popout.

# Troubleshooting

TODO

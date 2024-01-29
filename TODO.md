# TODO's before first production-ready release

- When panning the overlay down and releasing it, the overlay goes back into the tile.
  The tile should not be there at that moment because it goes 'back' into it.

- Currently, the Skia image snapshot is taken from the screen, but since it scales down, you lose some content on all sides. So I need to somehow capture slightly more content outside the screen for the effect to be really pretty.

- More flexibility for the user to configure the 'tile'.

- When you pan-drag an overlay all the way down, it glitches out of view.

# Ideas

- A new mode where the image animates to become the header of the overlay, and the overlay content appears below that header, filling the rest of the screen.

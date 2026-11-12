# DrishArt: A Virtual Art Gallery

DrishArt is a small virtual museum created by me to share my passion for art. It brings my own original artworks into a 3D gallery, where visitors can walk around, view each piece, and send an enquiry.

## Why “DrishArt”?

**DrishArt** joins **Drishya** (दृश्य, “sight” or “vision”) with **art**. The name means “sight of art”: a place to see and experience my original artworks.

## What you can do

- Walk through the gallery using the keyboard or on-screen movement buttons.
- Look around by dragging with a mouse or finger.
- Select a painting to view its details and move between artworks.
- Temporarily replace gallery images with your own to see how they look on the wall. These replacements stay in the current browser session and reset when the page reloads.
- Send an enquiry about an artwork through the contact form.

## Technology

- HTML5, CSS3, Vanilla JavaScript
- 8Three.js (r128, loaded from the cdnjs CDN) for the 3D gallery, using WebGL, spotlights and canvas textures for the paintings
- Web3Forms API

## Project files

```text
DrishArt/
├── index.html                 # Page structure and external font/library links
├── assets/
│   ├── css/styles.css         # Gallery and dialog styles
│   ├── js/app.js              # Artwork data, 3D scene, and interactions
│   └── sculpture.png          # Texture used by the central sculpture
├── artworks/
│   └── defaults/              # Eight optimized photos of my artworks
└── README.md
```

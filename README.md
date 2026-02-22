<div align="center">
  <img src="https://raw.githubusercontent.com/Noizefield/quirkatar-avatar-generator/main/Quirkatar.jpg" width="972px" />
  <h1>✨ Quirkatar Generator</h1>
  <p>A free, lightweight, zero-dependency procedural avatar generator for React</p>

  <a href="https://noizefield.github.io/quirkatar-avatar-generator/">
    <img src="https://img.shields.io/badge/LIVE_DEMO-Try_It_Now-brightgreen?style=for-the-badge&logo=google-chrome" />
  </a>
</div>

# Quirkatar 👾

> A free, lightweight, zero-dependency procedural avatar generator for React.

Create unique, funny, and random avatars instantly from a seed string. Perfect for user profiles, default avatars, and adding a touch of personality to your application.

![Avatar Grid](./preview.png)
*(Note: Add a screenshot of the avatar grid here and name it `preview.png`)*

## Features

- 🪶 **Zero Dependencies:** Built entirely with React and SVG. No heavy libraries, no external network requests. Just pure, fast rendering.
- 🎲 **Deterministic Seeds:** The same seed string will always generate the exact same avatar. Perfect for hashing user IDs or email addresses.
- ♾️ **Infinite Combinations:** With various head shapes, eyes, mouths, ears, and a carefully curated color palette, the possibilities are endless.
- 🎨 **Fully Customizable:** Easily adjust the size, shape (circle or square), and pass custom CSS classes.
- ⚡ **Lightweight:** Minimal footprint, making it perfect for any React project.

## Installation

Since Quirkatar is currently a single-file library, the easiest way to use it is to copy the component directly into your project.

1. Copy `src/lib/avatar.tsx` into your React project.
2. Import and use it!

*(If you publish this to npm, you can update this section to `npm install quirkatar`)*

## Usage

```tsx
import React from 'react';
import { Avatar } from './lib/avatar';

export default function UserProfile() {
  return (
    <div className="profile">
      {/* Generates a unique avatar based on the user's email or ID */}
      <Avatar seed="user@example.com" size={120} />
      
      {/* Square avatar with custom Tailwind classes */}
      <Avatar 
        seed="another-unique-seed" 
        size={64} 
        square={true} 
        className="shadow-lg border-2 border-white" 
      />
    </div>
  );
}
```

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `seed` | `string` | **Required** | The string used to deterministically generate the avatar. |
| `size` | `number` | `100` | The width and height of the avatar in pixels. |
| `square` | `boolean` | `false` | If true, renders a square avatar instead of a circle. |
| `className` | `string` | `undefined` | Optional CSS classes to pass to the underlying SVG element. |

## License

MIT License. Free to use in personal and commercial projects.

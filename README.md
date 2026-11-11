# Desi Bites — Pakistani Food Menu

An interactive, orbital dish showcase and demo ordering menu for **Desi Bites**, featuring classic Pakistani dishes with circular plate animations, live dish search, interactive Overview/Ingredients tabs, and a simulated shopping cart in PKR.

---

## Features

- **Orbital Dish Showcase (`DishOrbitCarousel`)**: Smooth GSAP-powered orbital transitions rotating circular dish plates around a curved pastel accent swoosh.
- **Multiple Navigation Modes**: Browse dishes using previous/next arrows, the clickable thumbnail strip, side pagination dots, keyboard arrow keys (`ArrowLeft` / `ArrowRight`), desktop scroll-pinning (`ScrollTrigger`), or horizontal touch swipes on mobile.
- **Dish Details Card**: Toggle between **Overview** (rating, description, interactive Like / Not-for-me feedback) and **Ingredients** for each dish.
- **Live Search Overlay**: Filter the 6 Pakistani menu items (`Chicken Biryani`, `Chicken Karahi`, `Beef Nihari`, `Chapli Kebab`, `Seekh Kebab`, `Beef Haleem`) by name and jump directly to any result.
- **Slide-In Navigation Menu**: Framer Motion animated side drawer (`Menu`, `About`, `Contact`) with outside-click and `Esc` key dismissal.
- **Order Modal & Cart Drawer**:
  - Click **Order food** to open a responsive modal showing the selected dish image, name, chef, PKR price, `-/+` quantity selector, and calculated total.
  - React Context cart state (`CartProvider` / `CartContext`) with a live item-count badge in the top bar.
  - Slide-in **Cart Drawer** supporting quantity adjustments, item removal, total calculation in PKR, and a demo checkout flow (`"Thank you, order placed!"`).
- **Responsive Layout**: Adapts automatically below `768px` into a vertical mobile stack with horizontally scrollable thumbnails, touch swipe gestures, and full-width modal/drawer sheets.
- **SEO & Image Optimization**: Configured page metadata, Open Graph and Twitter card tags, custom SVG plate-and-fork favicon (`app/icon.svg`), dark `#0a0a0a` theme color, and `next/image` dish image optimization.

---

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (`16.4.6`, App Router) & React (`19.3.0`)
- **Language**: [TypeScript](https://www.typescriptlang.org/) (`^5`)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) (`4.3.3`) + custom CSS variables & container queries (`Outfit` Google Font)
- **Animations**: [Framer Motion](https://www.framer.com/motion/) (`^14.12.0`) & [GSAP](https://gsap.com/) (`^3.15.1` with `ScrollTrigger`)
- **State Management**: React Context (`CartProvider` in `components/CartContext.tsx`)

---

## Getting Started

### Prerequisites

- Node.js and `npm`

### Installation & Running Locally

1. **Install dependencies**:

   ```bash
   npm install
   ```

2. **Start the development server**:

   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

### Additional Scripts

- `npm run build` — Create an optimized production build
- `npm run start` — Start the production server after building
- `npm run lint` — Run ESLint checks across the codebase

---

## Live Demo

> **Live Demo URL:**https://desibites-tan.vercel.app/
>
Build By Salmann

---

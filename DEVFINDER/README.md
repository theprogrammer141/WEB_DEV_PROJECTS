# DevFinder - Tailwind CSS v4 Setup

This project is set up with **Tailwind CSS v4**, which has significant changes from v3.

## 🚀 Quick Start

### Available Scripts

```bash
# Build CSS once
npm run build

# Build and watch for changes (development)
npm run dev

# Build CSS specifically  
npm run build-css

# Watch CSS for changes
npm run watch-css
```

## 📁 Project Structure

```
DEVFINDER/
├── src/
│   └── input.css          # Tailwind input file
├── dist/
│   └── output.css         # Generated CSS (don't edit)
├── index.html             # HTML file
├── package.json           # Dependencies and scripts
├── postcss.config.js      # PostCSS configuration
└── tailwind.config.js     # Tailwind configuration
```

## 🔧 How It Works

### Tailwind CSS v4 Key Changes:

1. **No `init` command** - Configuration is done differently
2. **PostCSS plugin moved** - Now uses `@tailwindcss/postcss`
3. **New import syntax** - Uses `@import "tailwindcss"`
4. **Build process** - Uses PostCSS CLI instead of Tailwind CLI

### Input File (`src/input.css`):
```css
@import "tailwindcss";

/* Custom styles can go here */
```

### Build Process:
The build process uses PostCSS to:
1. Process the `@import "tailwindcss"` directive
2. Scan HTML files for Tailwind classes
3. Generate optimized CSS in `dist/output.css`

## 🎨 Development Workflow

1. **Start development mode:**
   ```bash
   npm run dev
   ```

2. **Edit your HTML** (`index.html`) and use Tailwind classes

3. **Add custom styles** to `src/input.css` if needed

4. **The CSS automatically rebuilds** when you save changes

## 🔍 Configuration

### PostCSS Config (`postcss.config.js`):
```javascript
module.exports = {
  plugins: {
    '@tailwindcss/postcss': {},
    autoprefixer: {},
  },
}
```

### Tailwind Config (`tailwind.config.js`):
```javascript
module.exports = {
  content: [
    "./src/**/*.{html,js}",
    "./*.html"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

## 📦 Dependencies

- `tailwindcss`: ^4.1.11 (Core Tailwind CSS)
- `@tailwindcss/postcss`: ^4.1.11 (PostCSS plugin for v4)
- `@tailwindcss/cli`: ^4.0.0 (CLI tool)
- `postcss`: ^8.5.6 (CSS processor)
- `postcss-cli`: ^11.0.1 (PostCSS command line)
- `autoprefixer`: ^10.4.21 (CSS prefixing)

## 🚨 Important Notes

- **Don't edit** `dist/output.css` directly - it's generated automatically
- **Always use** the npm scripts to build CSS
- **Watch mode** (`npm run dev`) is recommended for development
- **HTML content** is scanned automatically for Tailwind classes

## 🎯 Next Steps

1. Open `index.html` in your browser
2. Start development mode: `npm run dev`
3. Edit HTML and see changes automatically reflected
4. Add your own custom styles in `src/input.css`
5. Customize the Tailwind config as needed

Happy coding! 🎉

# CliniScribe Web UI

A beautiful, modern React frontend for CliniScribe - the AI-powered study assistant for medical and nursing students.

## Features

✨ **Beautiful Medical Theme** - Professional blue/teal color scheme
🎨 **Drag & Drop Upload** - Intuitive file handling
📱 **Fully Responsive** - Works on all devices
⚡ **Real-time Feedback** - Loading states and progress indicators
📋 **Copy to Clipboard** - Easy note sharing
💾 **Export to Markdown** - Download your notes
🎯 **Subject Customization** - Tailored summaries
🎚️ **Length Control** - Adjust summary detail level

## Tech Stack

- **React 18** - Modern React with hooks
- **Vite** - Lightning-fast build tool
- **Tailwind CSS** - Utility-first CSS framework
- **Custom Components** - Reusable, accessible UI components

## Getting Started

### Prerequisites

- Node.js 16+ and npm/yarn
- CliniScribe backend running on http://localhost:8080

### Installation

```bash
# Navigate to the web-react directory
cd client/web-react

# Install dependencies
npm install
# or
yarn install
```

### Development

```bash
# Start the development server
npm run dev
# or
yarn dev

# Open http://localhost:5173 in your browser
```

### Production Build

```bash
# Build for production
npm run build
# or
yarn build

# Preview production build
npm run preview
# or
yarn preview
```

## Configuration

Create a `.env` file in the `client/web-react` directory:

```env
# API endpoint (defaults to http://localhost:8080)
VITE_API_URL=http://localhost:8080
```

## Project Structure

```
client/web-react/
├── src/
│   ├── api/
│   │   └── cliniscribe.js      # API client
│   ├── components/
│   │   ├── Header.jsx          # App header with branding
│   │   ├── Footer.jsx          # App footer
│   │   ├── UploadCard.jsx      # File upload with settings
│   │   ├── ResultsPanel.jsx    # Study notes display
│   │   └── LoadingSpinner.jsx  # Loading animation
│   ├── styles/
│   │   └── index.css           # Global styles
│   ├── App.jsx                 # Main app component
│   └── main.jsx                # Entry point
├── index.html
├── package.json
├── vite.config.js
└── tailwind.config.js
```

## Component Overview

### App.jsx
Main application component that manages state and orchestrates the upload/results flow.

### Header.jsx
Branded navigation header with CliniScribe logo and menu items.

### Footer.jsx
App footer with links and legal information.

### UploadCard.jsx
Feature-rich upload component with:
- Drag & drop file upload
- Subject selector (Anatomy, Pharmacology, etc.)
- Summary length slider
- File validation
- Progress indicators

### ResultsPanel.jsx
Beautiful display of generated study notes with:
- Collapsible sections
- Copy to clipboard functionality
- Markdown export
- Color-coded sections
- Full transcription view

### LoadingSpinner.jsx
Animated loading indicator for processing states.

## Customization

### Colors
Edit `tailwind.config.js` to customize the color palette:

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        // Add custom colors here
      }
    }
  }
}
```

### Subjects
Add more subjects in `UploadCard.jsx`:

```javascript
const SUBJECTS = [
  // Add your custom subjects
  { value: "cardiology", label: "Cardiology" },
]
```

## Docker Deployment

Build and run with Docker:

```bash
# Build the image
docker build -t cliniscribe-ui .

# Run the container
docker run -p 5173:5173 cliniscribe-ui
```

Or use with docker-compose (from project root):

```bash
docker-compose up -d
```

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers

## Development Tips

### Hot Module Replacement
Vite provides instant HMR - changes appear immediately without page refresh.

### Component Development
Use React DevTools for debugging components and state.

### Tailwind IntelliSense
Install the Tailwind CSS IntelliSense VS Code extension for autocomplete.

### API Testing
Use the browser console to test API calls:

```javascript
import { uploadAudio } from './api/cliniscribe'

// Test with a file
const file = document.querySelector('input[type="file"]').files[0]
await uploadAudio(file, 0.15, 'anatomy')
```

## Contributing

Contributions welcome! Areas for improvement:

- [ ] Dark mode toggle
- [ ] User authentication
- [ ] History/saved notes
- [ ] Keyboard shortcuts
- [ ] Accessibility improvements
- [ ] Internationalization (i18n)
- [ ] Progressive Web App (PWA)

## License

Designed for educational use by medical and nursing students.

## Support

Found a bug? Have a feature request? Open an issue on GitHub!

---

**Happy studying! 🎓💙**
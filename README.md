# Profile Page

A modern, responsive profile page built with React and Tailwind CSS, perfect for showcasing your professional information during interviews.

## Features

- 🎨 Modern, clean design with Tailwind CSS
- 📱 Fully responsive layout
- ⚡ Built with React and Vite for fast development
- 🎯 Professional sections: Header, About, Skills, Experience, Contact
- 💼 Perfect for interview presentations

## Getting Started

### Prerequisites

Make sure you have Node.js installed on your system.

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

## Customization

### Personal Information

Edit the following files to customize your profile:

- `src/components/Header.jsx` - Update name, title, and profile picture
- `src/components/About.jsx` - Modify the about section
- `src/components/Skills.jsx` - Update your skills and proficiency levels
- `src/components/Experience.jsx` - Add your work experience
- `src/components/Contact.jsx` - Update contact information

### Styling

The project uses Tailwind CSS with a custom color scheme. You can modify:

- `tailwind.config.js` - Update colors, fonts, and other design tokens
- `src/index.css` - Add custom CSS classes and global styles

## Project Structure

```
src/
├── components/
│   ├── ProfilePage.jsx    # Main layout component
│   ├── Header.jsx         # Profile header with photo and basic info
│   ├── About.jsx          # About me section
│   ├── Skills.jsx         # Skills with proficiency bars
│   ├── Experience.jsx     # Work experience timeline
│   └── Contact.jsx        # Contact information and links
├── App.jsx                # Main app component
├── main.jsx              # React entry point
└── index.css             # Global styles and Tailwind imports
```

## Technologies Used

- **React 18** - Modern React with hooks
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixing

## License

This project is open source and available under the [MIT License](LICENSE).



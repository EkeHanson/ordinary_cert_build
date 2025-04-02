# Certificate Builder Application

## Overview
The Certificate Builder is a React-based web application that allows users to create, customize, and download professional certificates. Users can design certificates with various templates, add recipient details, include signatures and logos, and export the final product in multiple formats (PNG, JPEG, PDF).

## Key Features
- **Customizable Templates**: Choose from multiple pre-designed templates or upload your own
- **Drag-and-Drop Interface**: Easily position signatures, logos, and text elements
- **Signature Management**: Draw, upload, or manage multiple signatures
- **Logo Integration**: Add and position organizational logos
- **Barcode/QR Code Support**: Include verification barcodes
- **Multiple Export Formats**: Download as PNG, JPEG, or PDF
- **Undo/Redo Functionality**: Easily revert changes
- **Responsive Design**: Works on various screen sizes

## Project Structure
```
/src
├── /assets
│   └── /templates          # Certificate template images
├── /components
│   ├── /Certificate
│   │   ├── BarcodeGenerator.js
│   │   ├── BulkCertificateControls.js
│   │   ├── Certificate.js
│   │   ├── CertificateControls.js
│   │   ├── CertificateTemplates.js
│   │   ├── LogoManager.js
│   │   ├── PreviewModal.js
│   │   └── SignatureManager.js
│   └── /UI
│       ├── DraggableElement.js
│       └── Toolbar.js
├── /contexts
│   └── CertificateContext.js  # State management
├── App.js                    # Main application component
└── App.css                   # Main styles
```

## Main Components

### 1. CertificateContext
- Manages all certificate state including:
  - Certificate details (title, recipient name, course name)
  - Design elements (template, colors, borders)
  - Signatures and logos
  - History for undo/redo functionality

### 2. Certificate Component
- Displays the certificate preview
- Handles responsive sizing
- Manages draggable elements (signatures, logos)

### 3. CertificateControls Component
- Provides tabs for editing different aspects:
  - **Details**: Basic certificate information
  - **Design**: Colors, borders, styling
  - **Signatures**: Add/manage signatures
  - **Logos**: Add/manage logos
  - **Templates**: Select or upload templates

### 4. SignatureManager Component
- Allows adding signatures via:
  - Drawing directly on canvas
  - Uploading image files
- Manages existing signatures

### 5. LogoManager Component
- Handles logo uploads and positioning
- Limits to 3 logos per certificate

### 6. PreviewModal Component
- Shows full preview of certificate
- Provides download options (PNG, JPEG, PDF)

### 7. Toolbar Component
- Main application controls:
  - New certificate
  - Save/Load
  - Preview

## Setup Instructions

### Prerequisites
- Node.js (v14 or later)
- npm or yarn

### Installation
1. Clone the repository
   ```bash
   git clone https://github.com/EkeHanson/ordinary_cert_build.git
   cd certificate-builder
   ```

2. Install dependencies
   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server
   ```bash
   npm start
   # or
   yarn start
   ```

4. Open your browser and navigate to `http://localhost:5173/`

## Available Scripts

- `npm start`: Runs the app in development mode
- `npm test`: Launches the test runner
- `npm run build`: Builds the app for production
- `npm run eject`: Ejects from Create React App (advanced)

## Dependencies
- React (v17+)
- react-color: For color picker functionality
- html-to-image: For exporting certificates as images
- jspdf: For PDF generation
- react-signature-canvas: For signature drawing
- react-icons: For icon set

## Customization
To add more templates:
1. Add your template images to `/src/assets/templates`
2. Update the `templateImages` object in `CertificateTemplates.js`


# **App Name**: Pix Proof Generator

## Core Features:

- Value Editing: Allows users to edit the transaction value, updating the display in real-time.
- Date and Time Editing: Enables users to modify the date and time, with live updates on the receipt.
- Name Editing: Permits changing the 'Nome' and 'Nome original' fields, reflected immediately on the receipt.
- Image Export: Provides a 'Baixar comprovante em imagem (PNG)' option to export the receipt as a PNG image.
- Responsive Layout: Ensures the layout adapts smoothly to different screen sizes, especially for mobile devices.
- Data persistence: Edited values are stored in a Firestore collection named 'comprovantes'

## Style Guidelines:

- Background color: Black (#000000) to match the Nubank Pix receipt.
- Text color: White (#FFFFFF) for primary text to ensure readability on the black background.
- Secondary text color: Gray (#C5C5C5) for less prominent information.
- Accent color: Dark Green (#006B3F) for the 'Transferência recebida' tag, representing Pix branding.
- Button color: Dark Gray (#2C2C2C) for interactive elements.
- Font: 'Inter' sans-serif, neutral and modern. Note: currently only Google Fonts are supported.
- Layout: Mimic the exact structure of the Nubank Pix receipt for a familiar user experience, optimized for mobile view.
- Use a green money icon (SVG) at the top to represent the Pix transaction, keeping it simple and recognizable.
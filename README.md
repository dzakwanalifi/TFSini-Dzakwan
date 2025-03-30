# TFSini - Info Pembayaran

## About

TFSini ("Transfer Sini" or "Transfer Here") is a simple yet elegant web application designed to make it easy for people to share their payment information for receiving transfers, particularly for Eid al-Fitr gifts (THR - Tunjangan Hari Raya) in Indonesia.

The app displays bank accounts, e-wallets, and QRIS codes in a clean, user-friendly interface with easy copy-to-clipboard functionality.

## Features

- 📋 **One-Click Copy**: Easily copy account numbers with a single click
- 📱 **Mobile Responsive**: Works perfectly on both mobile and desktop devices
- 🌙 **Light Mode**: Clean, accessible design
- 💳 **Multiple Account Types**: Support for various bank accounts, international accounts, and e-wallets
- 📲 **QRIS Support**: Includes QRIS code for easy payment via any e-wallet app
- 💬 **WhatsApp Integration**: Direct confirmation via pre-filled WhatsApp message

## Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) with App Router
- **Language**: TypeScript
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Components**: Custom components built with [shadcn/ui](https://ui.shadcn.com/) design system
- **Fonts**: Space Grotesk (via Google Fonts)
- **Icons**: [Lucide React](https://lucide.dev/icons/)
- **Notifications**: [Sonner](https://sonner.emilkowal.ski/) for toast messages

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm, yarn, or pnpm

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/dzakwanalifi/TFSini.git
   cd TFSini
   ```

2. Install dependencies
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. Run the development server
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application

### Configuration

To customize the payment information, edit the data objects in `src/app/page.tsx`:

```typescript
// Bank accounts
const bankAccounts = [
  { id: 'rek-bsi', name: 'Bank Syariah Indonesia (451)', number: '7*********', logo: '/logos/bsi.png' },
  // Add more accounts as needed
];

// E-wallet information
const eWallets = {
  id: 'ewallet-all',
  name: 'E-Wallet',
  number: '08**********',
  logos: [
    { name: 'ShopeePay', path: '/logos/shopeepay.png' },
    // Add more e-wallets as needed
  ]
};
```

## Deployment

This application can be deployed on any platform that supports Next.js, such as:

- [Vercel](https://vercel.com) (recommended)
- [Netlify](https://netlify.com)
- [AWS Amplify](https://aws.amazon.com/amplify/)

### Deploying to Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com) from the creators of Next.js.

1. Push your code to a GitHub repository
2. Import your project to Vercel
3. Vercel will automatically detect Next.js and configure the build settings

## Usage

1. Share the deployed URL with anyone who needs to send you a payment
2. Recipients can copy account numbers with a single click
3. They can confirm their transfer via WhatsApp with the integrated button
4. The QRIS code can be scanned directly for instant payment

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the [MIT License](LICENSE).

## Acknowledgements

- Special thanks to the Next.js team for the amazing framework
- [shadcn/ui](https://ui.shadcn.com/) for the beautiful component system
- All the contributors to the open source libraries used in this project

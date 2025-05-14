import './globals.css';

export const metadata = {
  title: {
    template: '%s | Business Model Canvas',
    default: 'Business Model Canvas',
  },
  description: 'Interactive Business Model Canvas with guided questions',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50">
        {children}
      </body>
    </html>
  );
}

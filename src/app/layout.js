// src/app/layout.js
import './globals.css';

export const metadata = {
  title: 'Personal Finance Visualizer',
  description: 'Track your finances easily.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

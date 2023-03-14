import './globals.css';
import 'the-new-css-reset/css/reset.css';

export const metadata = {
  title: 'Three.js Practices',
  description: 'This is a site that lists practices for three.js.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='ja'>
      <body>{children}</body>
    </html>
  );
}

import type { Metadata } from 'next';
import './globals.css';
import './activities.css';
export const metadata: Metadata={title:'Avatar · Element Quest',description:'An English movie-night adventure with two learning levels.'};
export default function RootLayout({children}:Readonly<{children:React.ReactNode}>){return <html lang="en" className="dark"><body>{children}</body></html>}

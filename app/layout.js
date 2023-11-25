import ClientLayout from "./ClientLayout";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head></head>
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}

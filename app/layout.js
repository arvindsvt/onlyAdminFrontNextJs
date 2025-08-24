import "../styles/globals.css";
import AdminShell from "../components/AdminShell";

export const metadata = { title: "Admin Panel", description: "Users admin UI" };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AdminShell>{children}</AdminShell>
      </body>
    </html>
  );
}

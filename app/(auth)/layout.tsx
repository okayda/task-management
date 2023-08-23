import "../../scss/_auth.scss";
import { ClerkProvider } from "@clerk/nextjs";

export const metadata = {
  title: "Secured",
  description: "Highly secured authentication",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <div className="auth-container">{children}</div>
        </body>
      </html>
    </ClerkProvider>
  );
}

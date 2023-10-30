import { ThemeProvider } from "@/components/providers/theme-provider";
import { cn } from "@/lib/utils";
import '@/styles/globals.css';
import { ClerkProvider } from "@clerk/nextjs";
import { Open_Sans } from "next/font/google";

const font = Open_Sans({ subsets: ["latin"] });

export const metadata = {
  title: "Next.js 13 with Clerk",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={cn(font.className, "bg-white dark:bg-[#313338]")}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            storageKey="app-theme"
          >
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}

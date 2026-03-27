import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { headers } from "next/headers";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Ally Saleh | Archive · Poetry, Stories & Online Resources",
  description:
    "Digital archive — poetry, short stories, and online resources (videos, reviews, articles) by and about Ally Saleh.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

function archiveShellBootScript() {
  return `(function(){
try{
var t=localStorage.getItem('ally_saleh_theme')||localStorage.getItem('allyTheme');
if(t!=='light'){
document.documentElement.classList.add('archive-shell--dark');
document.body.classList.add('archive-shell--dark');
}else{
document.documentElement.classList.remove('archive-shell--dark');
document.body.classList.remove('archive-shell--dark');
}
}catch(e){}
})();`;
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = (await headers()).get("x-pathname") ?? "";
  const isArchiveHome = pathname === "/";
  const shell = isArchiveHome ? "archive-shell" : "";
  const htmlClass = [inter.variable, shell].filter(Boolean).join(" ");
  const bodyClass = [inter.className, shell].filter(Boolean).join(" ");

  return (
    <html lang="en" className={htmlClass} suppressHydrationWarning>
      <head>
        {isArchiveHome ? (
          <style
            dangerouslySetInnerHTML={{
              __html:
                "html.archive-shell,body.archive-shell{margin:0;padding:0!important;min-height:100%;background:#fbfaf8}html.archive-shell.archive-shell--dark,body.archive-shell.archive-shell--dark{background:#0c0c0e}",
            }}
          />
        ) : null}
        <link
          rel="stylesheet"
          href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
        />
      </head>
      <body className={bodyClass} suppressHydrationWarning>
        {isArchiveHome ? (
          <script
            dangerouslySetInnerHTML={{ __html: archiveShellBootScript() }}
          />
        ) : null}
        {children}
      </body>
    </html>
  );
}

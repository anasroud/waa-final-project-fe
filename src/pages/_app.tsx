import { AuthProvider } from "@/context/AuthContext";
import "@/styles/globals.css";
import ProtectedRoute from "@/components/ProtectedRoute/ProtectedRoute";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { UserRole } from "@/types/Users";
import { AppProps } from "next/app";
import { Toaster } from "sonner";
import Head from "next/head";

const protectedRoutes: Record<string, UserRole[]> = {
  "/owner": ["owner"],
  "/dashboard": ["admin"],
  "/search": ["customer"],
};

export default function App({ Component, pageProps, router }: AppProps) {
  const allowedRoles = protectedRoutes[router.pathname];

  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />

        <meta
          name="description"
          content="A place where you can find sell your properties"
        />
        <link
          rel="icon"
          href="https://icons.iconarchive.com/icons/graphicloads/100-flat/256/home-icon.png"
        />
        <title>HomeFinder</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#000000" />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="HomeFinder" />
        <meta name="keywords" content="HomeFinder, properties, homes" />
        <meta property="og:title" content="HomeFinder" />
        <meta
          property="og:description"
          content="A place where you can find sell your properties"
        />
        <meta property="og:site_name" content="HomeFinder" />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://waa-final-project-fe.vercel.app/"
        />
        <meta
          property="og:image"
          content="https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg"
        />
        <meta property="og:image:alt" content="HomeFinder" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="HomeFinder" />
        <meta
          name="twitter:description"
          content="A place where you can find sell your properties"
        />
        <meta
          name="twitter:image"
          content="https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg"
        />
        <meta name="twitter:image:alt" content="HomeFinder" />
        <meta name="twitter:site" content="@homefinder" />
        <meta name="twitter:creator" content="@homefinder" />
      </Head>
      <AuthProvider key={typeof window !== "undefined" ? "client" : "server"}>
        {allowedRoles ? (
          <ProtectedRoute allowedRoles={allowedRoles}>
            <Component {...pageProps} />
          </ProtectedRoute>
        ) : (
          <Component {...pageProps} />
        )}
        <Toaster richColors position="top-right" />
        <SpeedInsights />
      </AuthProvider>
    </>
  );
}

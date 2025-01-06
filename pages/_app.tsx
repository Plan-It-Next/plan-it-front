import type { AppProps } from "next/app";
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import '../styles/globals.css';
import 'mapbox-gl/dist/mapbox-gl.css'
import { MainLayout } from "@/components/MainLayout";

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <NextUIProvider>
            <NextThemesProvider attribute="class" defaultTheme="light">
                  <MainLayout>
                    <Component {...pageProps} />
                  </MainLayout>
            </NextThemesProvider>
        </NextUIProvider>
    );
}

export default MyApp;

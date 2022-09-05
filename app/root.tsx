import type { LinksFunction, LoaderArgs, MetaFunction } from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";
import clsx from 'clsx';
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import { ThemeProvider, useTheme } from '~/utils/theme-provider';
import { getUser } from "./session.server";
import tailwindStylesheetUrl from "./styles/tailwind.css";
import LayoutWrapper from "~/components/LayoutWrapper";

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: tailwindStylesheetUrl }];
};

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Remix Notes",
  viewport: "width=device-width,initial-scale=1",
});

export async function loader({ request, context }: LoaderArgs) {
  return json({
    user: await getUser(request, context),
  });
}

function App() {
  const [theme] = useTheme();

  return (
    <html lang="en" className={`h-full ${clsx(theme)}`}>
        <head>
          <Meta />
          <Links />
        </head>
        <body className="h-full">
          <LayoutWrapper>          
            <Outlet />
          </LayoutWrapper>
          <ScrollRestoration />
          <Scripts />
          <LiveReload />
        </body>
    </html>
  );
}

export default function AppWithProviders() {
  return (
    <ThemeProvider>
      <App />
    </ThemeProvider>
  );
}
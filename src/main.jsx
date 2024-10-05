import { createRoot } from "react-dom/client";
import "./index.css";
import ContextProvider from "./context/Context.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/homePage/HomePage.jsx";
import DashboardPage from "./pages/dashboardPage/DashboardPage.jsx";
import ChatPage from "./pages/chatPage/ChatPage.jsx";
import RootLayout from "./layouts/rootLayout/RootLayout.jsx";
import DashboardLayout from "./layouts/dashboardLayout/DashboardLayout.jsx";
import SignInPage from "./pages/signInPage/SignInPage.jsx";
import SignUpPage from "./pages/signUpPage/SignUpPage.jsx";
// import UnityGame from "./components/UnityGame/UnityGame.jsx";
import ExploreExoplanets from "./pages/ExploreExoplanets/ExploreExoplanets.jsx";
import AISection from "./components/AISection/AISection.jsx";
import ExoplanetDetails from "./components/ExoplanetDetails/ExoplanetDetails.jsx";
import VrPage from "./pages/VrPage/VrPage.jsx";
import Planet from "./components/Planet/Planet.jsx";
import GamePage from "./pages/GamePage/GamePage.jsx";
import Game from "./components/Game/Game.jsx";
import SocialPage from "./pages/SocialPage/SocialPage.jsx";

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/explore",
        element: <ExploreExoplanets />,
      },
      {
        path: "/explore/:planetName",
        element: <ExoplanetDetails />,
      },
      {
        path: "/ai",
        element: <AISection />,
      },
      {
        path: "/social",
        element: <SocialPage />,
      },
      {
        path: "/vr",
        element: <VrPage />,
      },
      {
        path: "/vr/planet-1",
        element: <Planet />,
      },
      {
        path: "/gameMenu",
        element: <GamePage />,
      },
      {
        path: "/gameMenu/game",
        element: <Game />,
      },
      {
        path: "/sign-in/*",
        element: <SignInPage />,
      },
      {
        path: "/sign-up/*",
        element: <SignUpPage />,
      },
      {
        element: <DashboardLayout />,
        children: [
          { path: "/dashboard", element: <DashboardPage /> },
          { path: "/dashboard/chats/:id", element: <ChatPage /> },
        ],
      },
      // {
      //   path: "/game*",
      //   element: <UnityGame />,
      // },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <ContextProvider>
    <RouterProvider router={router} />
  </ContextProvider>
);
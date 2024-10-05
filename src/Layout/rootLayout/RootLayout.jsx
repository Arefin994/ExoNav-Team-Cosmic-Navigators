import { Link, NavLink, Outlet } from "react-router-dom";
import "./rootLayout.css";
import { assets } from "../../assets/assets";
import { ClerkProvider, SignedIn, UserButton } from "@clerk/clerk-react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

const queryClient = new QueryClient();

const RootLayout = () => {
  return (
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
      <QueryClientProvider client={queryClient}>
        <div className="rootLayout">
        <header className="nav">
            <div className="logo">
              <Link
                className="fullLogo"
                to="/"
                style={{ textDecoration: "none" }}
              >
                <img src={assets.AI_icon} alt="" />
              </Link>
              <p>ExoNav </p>
            </div>
            {/* Navigation Links */}
            <nav className="navLinks">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? "activeLink" : undefined
                }
                style={{ textDecoration: "none" }}
              >
                Home
              </NavLink>
              <NavLink
                to="/explore"
                className={({ isActive }) =>
                  isActive ? "activeLink" : undefined
                }
                style={{ textDecoration: "none" }}
              >
                Explore
              </NavLink>
              <div className="dropdown">
                <NavLink
                  to="/learn"
                  className={({ isActive }) =>
                    isActive ? "activeLink" : undefined
                  }
                  style={{ textDecoration: "none" }}
                >
                  Learn
                </NavLink>

                <div className="dropdownContent">
                  <Link to="/ai" style={{ textDecoration: "none" }}>
                    AI
                  </Link>
                  <Link to="/social" style={{ textDecoration: "none" }}>
                    Social
                  </Link>
                </div>
              </div>
              <NavLink
                to="/vr"
                className={({ isActive }) =>
                  isActive ? "activeLink" : undefined
                }
                style={{ textDecoration: "none" }}
              >
                VR
              </NavLink>
              <NavLink
                to="/gameMenu"
                className={({ isActive }) =>
                  isActive ? "activeLink" : undefined
                }
                style={{ textDecoration: "none" }}
              >
                Game
              </NavLink>
              <NavLink
                
                style={{ textDecoration: "none" }}
              >
                <SignedIn>
                <UserButton />
              </SignedIn>
              </NavLink>
            </nav>
            {/* User */}
            {/* <div className="userButton">
              
            </div> */}
          </header>

          <main>
            <Outlet />
          </main>
        </div>
      </QueryClientProvider>
    </ClerkProvider>
  );
};

export default RootLayout;
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import Logo from "/KitaabKosh_logo.svg";
import { useAuth } from "../../components/auth-context";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-50 shadow">
      <nav className="border-gray-200 bg-background py-2.5">
        <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between px-4">
          <Link to="/dashboard" className="flex items-center">
            <img src={Logo} className="mr-3 h-12" alt="KitaabKosh Logo" />
          </Link>
          <button
            type="button"
            className="ml-auto inline-flex items-center rounded-lg p-2 text-sm text-[#042546] hover:bg-gray-100 focus:outline-none lg:hidden"
            aria-controls="navbar"
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d={
                  isMenuOpen
                    ? "M6 18L18 6M6 6l12 12"
                    : "M4 6h16M4 12h16M4 18h16"
                }
              />
            </svg>
          </button>

          <div
            className={`${
              isMenuOpen ? "block" : "hidden"
            } w-full items-center justify-between lg:order-1 lg:flex lg:w-auto`}
            id="navbar"
          >
            <ul className="mt-4 flex flex-col items-center font-medium lg:mt-0 lg:flex-row lg:space-x-8">
              <li>
                <NavLink
                  to="/dashboard"
                  className={({ isActive }) =>
                    `block py-2 pl-3 pr-4 ${
                      isActive ? "text-[#98793E]" : "text-[#042546]"
                    } border-b border-gray-100 hover:bg-gray-50 hover:text-[#745c30] lg:border-0 lg:p-0 lg:hover:bg-transparent`
                  }
                >
                  Home
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/about"
                  className={({ isActive }) =>
                    `block py-2 pl-3 pr-4 ${
                      isActive ? "text-[#98793E]" : "text-[#042546]"
                    } border-b border-gray-100 hover:bg-gray-50 hover:text-[#745c30] lg:border-0 lg:p-0 lg:hover:bg-transparent`
                  }
                >
                  About
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/contact" 
                  className={({ isActive }) =>
                    `block py-2 pl-3 pr-4 ${
                      isActive ? "text-[#98793E]" : "text-[#042546]"
                    } border-b border-gray-100 hover:bg-gray-50 hover:text-[#745c30] lg:border-0 lg:p-0 lg:hover:bg-transparent`
                  }
                >
                  Contact Us
                </NavLink>
              </li>
              {user ? (
                <>
                  <li>
                    <span className="text-[#042546]">
                      Welcome, {user.name}
                    </span>
                  </li>
                  <li>
                    <button
                      onClick={handleLogout}
                      className="text-back mr-2 rounded-lg bg-[#98793E] px-4 py-2 text-sm font-medium hover:bg-[#745c30] lg:px-5 lg:py-2.5"
                    >
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                <div className="py-3">
                  <li>
                    <Link
                      to="/"
                      className="text-back mr-2 rounded-lg bg-[#98793E] px-4 py-2 text-sm font-medium hover:bg-[#745c30] lg:px-5 lg:py-2.5"
                    >
                      Log in
                    </Link>
                  </li>
                </div>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;

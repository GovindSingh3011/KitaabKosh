import { Link, NavLink } from "react-router-dom";
import Logo from "/KitaabKosh_logo.svg";

function Header() {
  return (
    <header className="sticky top-0 z-50 shadow">
      <nav className="border-gray-200 bg-background py-2.5">
        <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between">
          <Link to="/" className="flex items-center">
            <img src={Logo} className="mr-3 h-12" alt="KitaabKosh Logo" />
          </Link>
          <div className="items-center justify-between lg:order-1 lg:flex lg:w-auto">
            <ul className="mt-4 flex flex-col font-medium lg:mt-0 lg:flex-row lg:space-x-8">
              <li>
                <NavLink
                  to="/dashboard"
                  className={({ isActive }) =>
                    `block py-2 pl-3 pr-4 ${isActive ? "text-[#98793E]" : "text-[#042546]"} border-b border-gray-100 hover:bg-gray-50 hover:text-[#745c30] lg:border-0 lg:p-0 lg:hover:bg-transparent`
                  }
                >
                  Home
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/about"
                  className={({ isActive }) =>
                    `block py-2 pl-3 pr-4 ${isActive ? "text-[#98793E]" : "text-[#042546]"} border-b border-gray-100 hover:bg-gray-50 hover:text-[#745c30] lg:border-0 lg:p-0 lg:hover:bg-transparent`
                  }
                >
                  About
                </NavLink>
              </li>
            </ul>
          </div>

          <div className="flex items-center lg:order-2">
            <Link
              to="#"
              className="mr-2 rounded-lg px-4 py-2 text-sm font-medium text-[#042546] hover:bg-gray-50 lg:px-5 lg:py-2.5"
            >
              Log in
            </Link>
            <Link
              to="#"
              className="text-back mr-2 rounded-lg bg-[#98793E] px-4 py-2 text-sm font-medium hover:bg-[#745c30] lg:px-5 lg:py-2.5"
            >
              Get started
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;

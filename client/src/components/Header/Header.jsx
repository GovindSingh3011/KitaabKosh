import { Link, NavLink } from 'react-router-dom'
import Logo from '../../assets/KitaabKosh_logo.svg'

function Header() {

    return (
        <header className="shadow sticky z-50 top-0">
            <nav className="bg-white border-gray-200  py-2.5">
                <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
                    <Link to="/" className="flex items-center">
                        <img
                            src={Logo}
                            className="mr-3 h-12"
                            alt="KitaabKosh Logo"
                        />
                    </Link>
                    <div className="justify-between items-center lg:flex lg:w-auto lg:order-1"
                    >
                        <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                            <li>
                                <NavLink to="/" className={({ isActive }) =>
                                    `block py-2 pr-4 pl-3 ${isActive ? "text-[#98793E]" : "text-[#042546]"} border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-[#745c30] lg:p-0`
                                }
                                > Home </NavLink>
                            </li>

                            <li>
                                <NavLink to="/about" className={({ isActive }) =>
                                    `block py-2 pr-4 pl-3 ${isActive ? "text-[#98793E]" : "text-[#042546]"} border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-[#745c30] lg:p-0`
                                }
                                > About </NavLink>
                            </li>

                        </ul>
                    </div>

                    <div className="flex items-center lg:order-2">
                        <Link
                            to="#"
                            className="text-[#042546] hover:bg-gray-50 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2"
                        >
                            Log in
                        </Link>
                        <Link
                            to="#"
                            className="text-white bg-[#98793E] hover:bg-[#745c30] font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2"
                        >
                            Get started
                        </Link>
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default Header

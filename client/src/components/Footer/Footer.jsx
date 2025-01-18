import { NavLink, Link } from 'react-router-dom'
import Logo from '../../assets/KitaabKosh_logo.svg'


function Footer() {
    return (
        <footer>
            <hr className="my-2 border-gray-200 sm:mx-auto" />

            <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
                <div className="md:flex md:justify-between">
                    <div className="mb-6 md:mb-0">
                        <Link to="/" className="flex items-center">
                            <img
                                src={Logo}
                                className="mr-3 h-20"
                                alt="KitaabKosh Logo"
                            />
                        </Link>
                    </div>

                    <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
                        <div>
                            <h2 className="mb-6 text-sm font-bold text-gray-900 uppercase">Resources</h2>
                            <ul className="text-[#042546] font-medium">
                                <li className="mb-4">
                                    <NavLink to="/" className={({ isActive }) =>
                                        `${isActive ? "text-[#745c30]" : "text-[#042546]"} hover:underline`
                                    }>
                                        Home
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/about" className={({ isActive }) =>
                                        `${isActive ? "text-[#745c30]" : "text-[#042546]"} hover:underline`
                                    }>
                                        About
                                    </NavLink>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h2 className="mb-6 text-sm font-bold text-gray-900 uppercase">Legal</h2>
                            <ul className="text-[#042546] font-medium">
                                <li className="mb-4">
                                    <Link to="#" className="hover:underline">
                                        Privacy Policy
                                    </Link>
                                </li>
                                <li>
                                    <Link to="#" className="hover:underline">
                                        Terms &amp; Conditions
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <hr className="my-6 border-gray-200 sm:mx-auto lg:my-8" />

                <div className="sm:flex sm:items-center sm:justify-between">
                    <span className="text-sm text-gray-500 sm:text-center">
                        Copyright © 2024 <a href="/" className="hover:underline font-bold">KitaabKosh</a> All Rights Reserved.
                    </span>
                </div>
            </div>
        </footer>
    )
}

export default Footer

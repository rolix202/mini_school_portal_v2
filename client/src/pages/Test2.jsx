import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Logo from "../assets/logo.png";

const menus = [
    { name: "Dashboard", href: "/dashboard" },
    { 
        name: "Teachers", 
        href: "#",  // Parent menu doesn't navigate
        submenus: [
            { name: "Add Teacher", href: "/dashboard/teachers/add" },
            { name: "View Teachers", href: "/dashboard/teachers/view" }
        ]
    },
    { name: "Students", href: "/dashboard/students" },
    { name: "Classes", href: "/dashboard/classes" },
    { name: "Subjects", href: "/dashboard/subjects" },
    { name: "Result", href: "/dashboard/results" }
];

const Home = () => {
    // State to control which menu is expanded
    const [openMenu, setOpenMenu] = useState(null);

    // Function to toggle menu
    const toggleMenu = (menuName) => {
        setOpenMenu(openMenu === menuName ? null : menuName);
    };

    return (
        <div className='wrapper flex'>
            <div className="side-bar p-5 w-1/6 bg-gray-900 h-screen">
                <div className="flex logo-wrapper border-b-2 border-b-yellow-700">
                    <a href="#" className='bg-red-500'>
                        <img src={Logo} alt="Logo" className='h-20 bg-red-950' />
                    </a>
                    <span className='text-3xl pl-3 grid content-center text-white'>Roland</span>
                </div>

                <div className="side-menus px-5 pt-6 text-xl">
                    <ul>
                        {menus.map((menu, index) => {
                            const isExpanded = openMenu === menu.name;

                            return (
                                <li key={index} className='pb-2'>
                                    {/* Parent Menu */}
                                    <div 
                                        className='flex justify-between items-center hover:bg-gray-700 rounded-md text-white cursor-pointer px-3 py-2' 
                                        onClick={() => menu.submenus ? toggleMenu(menu.name) : null}
                                    >
                                        <a href={menu.href} className='text-sm font-medium'>
                                            {menu.name}
                                        </a>
                                        {/* Arrow for submenus */}
                                        {menu.submenus && (
                                            <span className={`text-xs transform transition-transform ${isExpanded ? 'rotate-180' : 'rotate-0'}`}>
                                                ▼
                                            </span>
                                        )}
                                    </div>

                                    {/* Submenu */}
                                    {menu.submenus && (
                                        <ul 
                                            className={`pl-5 text-sm font-medium transition-all duration-300 overflow-hidden ${isExpanded ? 'max-h-40' : 'max-h-0'}`}
                                        >
                                            {menu.submenus.map((submenu, subIndex) => (
                                                <li key={subIndex} className='py-1 hover:bg-gray-600 rounded-md text-white'>
                                                    <a href={submenu.href} className='block px-2 py-1'>{submenu.name}</a>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
            <div className="main-content mt-5 mx-5 rounded-t-lg rounded-r-lg bg-gray-100 w-5/6">
                <Outlet />
            </div>
        </div>
    );
};

export default Home;

import React, { useState } from 'react';
import { HiBars3, HiOutlineXMark, HiChevronDown, HiChevronUp } from 'react-icons/hi2';

const Navbar= ({ menuItems, authItems }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [activeMenuItem, setActiveMenuItem] = useState(null);

  const onToggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const onToggleProfileDropdown = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  const handleMenuItemClick = (index) => {
    setActiveMenuItem(index);
  };

  const getHref = (routeName) => {
    return routeName && route().has(routeName) ? route(routeName) : '#';
  };

  return (
    <nav className='fixed top-0 z-50 flex flex-col md:flex-row justify-between w-full shadow-md'>
      <div className={`flex flex-row justify-between items-center px-5 py-3 ${isMenuOpen ? 'bg-transparent' : 'bg-white'} md:bg-white md:w-1/6 md:justify-center `}>
        <img src="storage/images/logo-siphani.png" alt="logo" className="w-[100px] h-[40px] object-cover" />
        <div className='flex md:hidden'>
          {isMenuOpen ? (
            <HiOutlineXMark
              onClick={onToggleMenu}
              className='text-white text-2xl cursor-pointer'
              style={{ marginLeft: 'auto' }}
            />
          ) : (
            <HiBars3
              onClick={onToggleMenu}
              className='text-black text-2xl cursor-pointer'
            />
          )}
        </div>
      </div>

      <div className={`nav-links flex flex-col md:flex-row justify-between md:items-center mx-5 mt-5 md:m-0  bg-white px-5 py-3  ${isMenuOpen ? 'block' : 'hidden'} md:flex md:w-full`}>
        <ul className="flex flex-col md:flex-row gap-6 md:gap-10 md:items-center md:mx-auto">
        {menuItems.map((item, index) => (
            <li key={index}>
              <a
                href={getHref(item.route)}
                className={`text-black text-base font-medium ${activeMenuItem === index ? 'text-amber-400' : 'hover:text-amber-300'}`}
                onClick={() => handleMenuItemClick(index)}
              >
                {item.text}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className={`nav-auth flex flex-col md:flex-row justify-between md:items-center bg-white p-3 mx-5 md:m-0   ${isMenuOpen ? 'block' : 'hidden'} md:flex md:w-1/4`}>
        <ul className='flex flex-col md:flex-row md:items-center md:mx-auto gap-3'>
        {authItems.map((item, index) => (
              <li
                key={index}
              >
                <a 
                  href={getHref(item.route)}
                  className={`${item.className} ${activeMenuItem === index + menuItems.length ? 'text-black' : 'hover:bg-amber-300 hover:text-white'}`}
                  onClick={() => handleMenuItemClick(index + menuItems.length)}
                >
                  {item.label}
                </a>
              </li>
            ))}
        </ul>
      </div>

    </nav>
  );
}

export default Navbar;
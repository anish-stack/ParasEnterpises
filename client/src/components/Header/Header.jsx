import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from './Picture1.png';
import { ArrowPathIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isLinkClick, setIsLinkClick] = useState(false)

  const handleLinkClick = () => {
    setMobileMenuOpen(false)
  }
  return (
    <div className='w-full'>
      <div className='bg-white shadow-md'>
        <header className="max-w-7xl flex mx-auto items-center justify-between p-6 lg:px-8">
          <div className='logo'>
            <Link className='flex items-center justify-center gap-1' to="/"><img className=' h-8 md:h-16 w-auto' src={Logo} alt="logo" />
              <h1 className=' hidden md:block lg:block md:text-xl text-center mt-2 text-red-700 font-bold'>Paras <span className='text-[#2541D2]'>Enterprises</span></h1>
            </Link>
          </div>
          <div className='flex items-center gap-3 justify-center lg:hidden'>
            <div className='flex carts'>
              <ul className='flex items-center  justify-between gap-5'>
                <li><Link className="rounded-lg text-xs md:text-base font-semibold text-gray-900 hover:bg-gray-50" to="/login">Login</Link> / <Link className="rounded-lg text-xs md:text-base font-semibold text-gray-900 hover:bg-gray-50" to="/register">Register</Link></li>
                <li><Link className="rounded-lg text-base font-semibold text-gray-900 hover:bg-gray-50" to="/cart"><i className="fa-solid fa-cart-shopping"></i></Link></li>
              </ul>
            </div>
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="sr-only">{mobileMenuOpen ? 'Close main menu' : 'Open main menu'}</span>
              {mobileMenuOpen ? <XMarkIcon className="h-6 w-6" aria-hidden="true" /> : <Bars3Icon className="h-6 w-6" aria-hidden="true" />}
            </button>
          </div>
          <nav className='hidden lg:flex'>
            <ul className='flex items-center justify-between gap-6'>
              <li className="relative group">

                <Link to="#" className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">Our Products  <i className="fa-solid fa-arrow-down h-5 w-5 ml-2 inline-block"></i></Link>
                <div className="dropdowns shadow-md bg-white px-5 w-full absolute z-30 hidden group-hover:block">
                  <ul className="">
                    <li>
                      <Link to="/Shop" className="block rounded-lg py-2 text-sm font-semibold leading-7 hover:text-red-400 text-gray-900 ">Product 1</Link>
                    </li>
                    <li>
                      <Link to="/Shop" className="block rounded-lg py-2 text-sm font-semibold leading-7 hover:text-red-400 text-gray-900 ">Product 2</Link>
                    </li>
                    <li>
                      <Link to="/Shop" className="block rounded-lg py-2 text-sm font-semibold leading-7 hover:text-red-400 text-gray-900 ">Product 3</Link>
                    </li>
                  </ul>
                </div>
              </li>
              {/* <li><Link to="/shop?Latest-Products" className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">Latest Products</Link></li> */}


              <li><Link to="/offers" className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">Offers</Link></li>
              <li><Link to="/certifications" className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">Certifications</Link></li>
              <li><Link to="/news" className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">News</Link></li>
            </ul>
          </nav>
          <div className='hidden lg:flex carts'>
            <ul className='flex items-center justify-between gap-5'>
              <li><Link to="/login" className="rounded-lg text-base font-semibold text-gray-900 hover:bg-gray-50">Login</Link> / <Link to="/register" className="rounded-lg text-base font-semibold text-gray-900 hover:bg-gray-50">Register</Link></li>
              <li><Link to="/cart" className="rounded-lg text-base font-semibold text-gray-900 hover:bg-gray-50"><i className="fa-solid fa-cart-shopping"></i></Link></li>
            </ul>
          </div>
        </header>
      </div>
      {/* Mobile Header */}
      <div className={`transform ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out fixed inset-0 z-40 bg-white shadow-lg lg:hidden`}>
        <div className='flex items-center justify-end p-4'>
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(false)}
          >
            <span className="sr-only">Close main menu</span>
            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <ul className='space-y-4 p-4'>
          <li className="relative">
            <button onClick={() => setDropdownOpen(!dropdownOpen)} className="block w-full text-left rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
              Our Products
              <i className="fa-solid fa-arrow-down h-5 w-5 ml-2 inline-block"></i>
              {/* <ArrowPathIcon className="h-5 w-5 ml-2 inline-block" /> */}
            </button>
            {dropdownOpen && (
              <div className="mt-2 space-y-2 bg-gray-50 p-2 rounded-lg">
                <Link onClick={handleLinkClick} to="/Shop" className="block rounded-lg py-2 px-3 text-sm font-semibold leading-7 text-gray-900 hover:text-red-400">Product 1</Link>
                <Link onClick={handleLinkClick} to="/Shop" className="block rounded-lg py-2 px-3 text-sm font-semibold leading-7 text-gray-900 hover:text-red-400">Product 2</Link>
                <Link onClick={handleLinkClick} to="/Shop" className="block rounded-lg py-2 px-3 text-sm font-semibold leading-7 text-gray-900 hover:text-red-400">Product 3</Link>
              </div>
            )}
          </li>
          {/* <li><Link onClick={handleLinkClick} to="/shop?Latest-Products" className="block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">Latest Products</Link></li> */}
          <li><Link onClick={handleLinkClick} to="/offers" className="block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">Offers</Link></li>
          <li><Link onClick={handleLinkClick} to="/certifications" className="block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">Certifications</Link></li>
          <li><Link onClick={handleLinkClick} to="/news" className="block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">News</Link></li>
        </ul>
      </div>
    </div>
  );
};

export default Header;

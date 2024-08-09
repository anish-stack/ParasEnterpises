import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from './Picture1.png';
import { ArrowPathIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import axios from 'axios';

const Header = ({ CartCount }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isTokenValid, setIsTokenValid] = useState(false);
  const [Categories, setCategories] = useState([]);
  const BackendUrl = import.meta.env.VITE_REACT_APP_BACKEND_URL;

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  const fetchAllCategories = async () => {
    try {
      const res = await axios.get(`${BackendUrl}/get-all-categories`);
      const data = res.data.categories;
      setCategories(data);
    } catch (error) {
      console.log(error);
    }
  };

  const checkTokenValidity = () => {
    const token = localStorage.getItem('ParasUserToken');
    const tokenExpired = localStorage.getItem('ParasUserTokenExpired');

    if (token && tokenExpired) {
      const expirationTime = parseInt(tokenExpired, 10);
      const currentTime = new Date().getTime();
      setIsTokenValid(currentTime < expirationTime);
    } else {
      setIsTokenValid(false);
    }
  };

  useEffect(() => {
    fetchAllCategories();
    checkTokenValidity();
  }, []);

  return (
    <div className='w-full'>
      <div className='bg-white shadow-md'>
        <header className="max-w-7xl flex mx-auto items-center justify-between p-6 lg:px-8">
          <div className='logo'>
            <Link className='flex items-center justify-center gap-1' to="/">
              <img className='h-8 md:h-16 w-auto' src={Logo} alt="logo" />
              <h1 className='hidden md:block lg:block md:text-xl text-center mt-2 text-red-700 font-bold'>
                Paras <span className='text-[#2541D2]'>Enterprises</span>
              </h1>
            </Link>
          </div>
          <div className='flex items-center gap-3 justify-center lg:hidden'>
            <div className='flex carts'>
              <ul className='flex items-center justify-between gap-5'>
                {isTokenValid ? (
                  <li>
                    <Link className="rounded-lg text-xs md:text-base font-semibold text-gray-900 hover:bg-gray-50" to="/profile">Profile</Link>
                  </li>
                ) : (
                  <li>
                    <Link className="rounded-lg text-xs md:text-base font-semibold text-gray-900 hover:bg-gray-50" to="/login">Login</Link> /
                    <Link className="rounded-lg text-xs md:text-base font-semibold text-gray-900 hover:bg-gray-50" to="/register">Register</Link>
                  </li>
                )}
                <li>
                  <Link className="rounded-lg text-base font-semibold text-gray-900 hover:bg-gray-50" to="/cart">
                    <i className="fa-solid fa-cart-shopping"></i>
                  </Link>
                  <span className='text-white px-[0.5rem] py-[0.3rem] relative bottom-3 bg-red-400 rounded-[50%]'>{CartCount || '0'}</span>
                </li>
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
              <li><Link to="/About" className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">About-us</Link></li>

              <li className="relative group">
                <Link to="#" className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                  Our Products <i className="fa-solid fa-arrow-down h-5 w-5 ml-2 inline-block"></i>
                </Link>
                <div className="dropdowns shadow-md bg-white p-2 w-[14rem]  absolute z-30 hidden group-hover:block">
                  <ul className="">
                    {Categories.map((item, index) => (
                      <li key={index}>
                        <a href={`/Category-Products/${item.name.replace(/\s+/g, '-')}`} className="block rounded-lg py-2 text-sm font-semibold leading-7 hover:text-red-400 text-gray-900">
                          {item.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>

              <li><Link to="/offers" className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">Offers</Link></li>
              <li><Link to="/certifications" className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">Certifications</Link></li>
              <li><Link to="/news" className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">News</Link></li>
            </ul>
          </nav>
          <div className='hidden lg:flex carts'>
            <ul className='flex items-center justify-between gap-5'>
              {isTokenValid ? (
                <li>
                  <Link to="/profile" className="rounded-lg text-base font-semibold text-gray-900 hover:bg-gray-50">Profile</Link>
                </li>
              ) : (
                <li>
                  <Link to="/login" className="rounded-lg text-base font-semibold text-gray-900 hover:bg-gray-50">Login</Link> /
                  <Link to="/register" className="rounded-lg text-base font-semibold text-gray-900 hover:bg-gray-50">Register</Link>
                </li>
              )}
              <li>
                <Link to="/cart" className="rounded-lg text-base font-semibold text-gray-900 hover:bg-gray-50">
                  <i className="fa-solid fa-cart-shopping"></i>
                </Link>
                <span className='text-white px-[0.5rem] py-[0.3rem] relative bottom-3 bg-red-400 rounded-[50%]'>{CartCount || '0'}</span>
              </li>
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
            </button>
            {dropdownOpen && (
              <div className="mt-2 space-y-2 bg-gray-50 p-2 rounded-lg">
                {Categories.map((item, index) => (
                  <li key={index}>
                    <a href={`/Category-Products/${item.name.replace(/\s+/g, '-')}`} className="block rounded-lg py-2 px-3 text-sm font-semibold leading-7 text-gray-900 hover:text-red-400">
                      {item.name}
                    </a>
                  </li>
                ))}
              </div>
            )}
          </li>
          <li><Link to="/offers" onClick={handleLinkClick} className="block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">Offers</Link></li>
          <li><Link to="/certifications" onClick={handleLinkClick} className="block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">Certifications</Link></li>
          <li><Link to="/news" onClick={handleLinkClick} className="block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">News</Link></li>
          {isTokenValid ? (
            <li><Link to="/profile" onClick={handleLinkClick} className="block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">Profile</Link></li>
          ) : (
            <>
              <li><Link to="/login" onClick={handleLinkClick} className="block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">Login</Link></li>
              <li><Link to="/register" onClick={handleLinkClick} className="block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">Register</Link></li>
            </>
          )}
          <li>
            <Link to="/cart" onClick={handleLinkClick} className="block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
              <i className="fa-solid fa-cart-shopping"></i>
            </Link>
            <span className='text-white px-[0.5rem] py-[0.3rem] relative bottom-3 bg-red-400 rounded-[50%]'>{CartCount || '0'}</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;

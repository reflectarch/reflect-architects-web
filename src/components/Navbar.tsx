'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import {useTranslations} from 'next-intl';
import LanguageToggle from './LanguageToggle';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  const t = useTranslations('Navbar');
  return (
    <nav className="w-full bg-white border-b border-gray-200">
      <div className="w-full px-4 sm:px-6 md:px-0">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 md:pl-[100px]">
            <Link href="/" className="flex items-center">
              <Image
                src="/reflect-logo.svg"
                alt="Reflect Architects"
                width={120}
                height={24}
                className="h-6 w-auto"
              />
            </Link>
          </div>

          {/* Navigation Links - Desktop */}
          <div className="hidden md:flex items-center">
            <div className="ml-10 flex items-baseline space-x-8">
              <Link
                href="/"
                className="text-gray-900 hover:text-gray-600 px-3 py-2 text-sm font-medium tracking-wide uppercase transition-colors duration-200"
              >
                {t('projects')}
              </Link>
              <Link
                href="/news"
                className="text-gray-900 hover:text-gray-600 px-3 py-2 text-sm font-medium tracking-wide uppercase transition-colors duration-200"
              >
                {t('news')}
              </Link>
              <Link
                href="/about"
                className="text-gray-900 hover:text-gray-600 px-3 py-2 text-sm font-medium tracking-wide uppercase transition-colors duration-200"
              >
                {t('about')}
              </Link>
              <Link
                href="/contact"
                className="text-gray-900 hover:text-gray-600 px-3 py-2 text-sm font-medium tracking-wide uppercase transition-colors duration-200"
              >
                {t('contact')}
              </Link>
            </div>
            
            {/* Language Toggle */}
            <div className="ml-8">
              <LanguageToggle />
            </div>
          </div>

          {/* Get Consultation Button - Desktop */}
          <div className="hidden md:block md:pr-[100px]">
            <Link
              href="/consultation"
              className="bg-black text-white px-4 py-2 text-xs font-medium tracking-wider uppercase hover:bg-gray-800 transition-colors duration-200"
            >
              {t('consultation')}
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              type="button"
              onClick={toggleMobileMenu}
              className="bg-white p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-black"
              aria-expanded={isMobileMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              {!isMobileMenuOpen ? (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-200">
            <Link
              href="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-gray-900 hover:text-gray-600 block px-3 py-2 text-base font-medium tracking-wide uppercase"
            >
              {t('projects')}
            </Link>
            <Link
              href="/news"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-gray-900 hover:text-gray-600 block px-3 py-2 text-base font-medium tracking-wide uppercase"
            >
              {t('news')}
            </Link>
            <Link
              href="/about"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-gray-900 hover:text-gray-600 block px-3 py-2 text-base font-medium tracking-wide uppercase"
            >
              {t('about')}
            </Link>
            <Link
              href="/contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-gray-900 hover:text-gray-600 block px-3 py-2 text-base font-medium tracking-wide uppercase"
            >
              {t('contact')}
            </Link>
            
            {/* Mobile Language Toggle */}
            <div className="px-3 py-2">
              <LanguageToggle />
            </div>
            
            <div className="pt-4 pb-2">
              <Link
                href="/consultation"
                onClick={() => setIsMobileMenuOpen(false)}
                className="bg-black text-white block px-3 py-2 text-sm font-medium tracking-wider uppercase hover:bg-gray-800 transition-colors duration-200 text-center"
              >
                {t('consultation')}
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
} 
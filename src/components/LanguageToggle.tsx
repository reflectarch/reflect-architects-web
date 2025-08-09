'use client';

import { useState, useTransition, useEffect } from 'react';

// Helper function to read cookie value
function getCookie(name: string): string | null {
  if (typeof window === 'undefined') return null;
  
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    return parts.pop()?.split(';').shift() || null;
  }
  return null;
}

export default function LanguageToggle() {
  const [currentLocale, setCurrentLocale] = useState('en'); // Start with default
  const [isPending, startTransition] = useTransition();

  // Sync with actual cookie value after mounting
  useEffect(() => {
    const cookieLocale = getCookie('locale');
    if (cookieLocale && (cookieLocale === 'en' || cookieLocale === 'az')) {
      setCurrentLocale(cookieLocale);
    }
  }, []);

  const handleLanguageChange = (locale: string) => {
    if (locale === currentLocale) return;
    
    startTransition(() => {
      // Set cookie with 1 year expiration
      const expires = new Date();
      expires.setFullYear(expires.getFullYear() + 1);
      document.cookie = `locale=${locale};expires=${expires.toUTCString()};path=/`;
      
      setCurrentLocale(locale);
      
      // Reload page to apply new locale
      window.location.reload();
    });
  };

  return (
    <div className="flex items-center space-x-1">
      <button
        onClick={() => handleLanguageChange('en')}
        disabled={isPending}
        className={`px-3 py-2 text-sm font-medium tracking-wide uppercase transition-colors duration-200 ${
          currentLocale === 'en'
            ? 'text-gray-900 border-b border-gray-900'
            : 'text-gray-500 hover:text-gray-900'
        }`}
      >
        EN
      </button>
      <span className="text-gray-300">|</span>
      <button
        onClick={() => handleLanguageChange('az')}
        disabled={isPending}
        className={`px-3 py-2 text-sm font-medium tracking-wide uppercase transition-colors duration-200 ${
          currentLocale === 'az'
            ? 'text-gray-900 border-b border-gray-900'
            : 'text-gray-500 hover:text-gray-900'
        }`}
      >
        AZ
      </button>
    </div>
  );
} 
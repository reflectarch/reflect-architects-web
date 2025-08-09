'use client';

import { useState } from 'react';
import {useTranslations} from 'next-intl';


export default function Footer() {
  const t = useTranslations('Footer');
  const [expandedSections, setExpandedSections] = useState<{
    email: boolean;
    offices: boolean;
    social: boolean;
    legal: boolean;
  }>({
    email: false,
    offices: false,
    social: false,
    legal: false,
  });

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const footerData = {
    email: [
      { label: 'INFO', value: 'info@reflect.az' }
    ],
    offices: [
      { label: 'Azerbaijan, Baku', value: '+994105119811' },
    ],
    social: [
      { label: 'INSTAGRAM', value: 'https://www.instagram.com/reflectarchitects' },
      { label: 'LINKEDIN', value: 'https://www.linkedin.com/company/reflect-architects' },
      { label: 'FACEBOOK', value: 'https://www.facebook.com/reflectarchitects' },
    ],
    // legal: [
    //   { label: 'PRIVACY POLICY', value: 'View Policy' },
    //   { label: 'TERMS OF SERVICE', value: 'View Terms' },
    //   { label: 'COOKIE POLICY', value: 'View Policy' },
    //   { label: 'LICENSING', value: 'View Licensing' },
    // ],
  };

  return (
    <footer className="bg-white border-t border-gray-200  left-0 right-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-16">
          
          {/* EMAIL Section */}
          <div>
            <button
              onClick={() => toggleSection('email')}
              className="flex items-center justify-between w-full text-left group"
            >
              <span className="text-sm font-medium text-gray-900 uppercase tracking-wider">
                {t('email')}
              </span>
              <span className="text-lg text-gray-600 group-hover:text-gray-900 transition-colors">
                {expandedSections.email ? '−' : '+'}
              </span>
            </button>
            
            {expandedSections.email && (
              <div className="mt-4 space-y-3">
                {footerData.email.map((item, index) => (
                  <div key={index}>
                    <div className="text-xs font-medium text-gray-900 uppercase tracking-wider mb-1">
                      {item.label}
                    </div>
                    <a 
                      href={`mailto:${item.value}`}
                      className="text-sm text-gray-600 hover:text-gray-900 underline transition-colors"
                    >
                      {item.value}
                    </a>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* OFFICES Section */}
          <div>
            <button
              onClick={() => toggleSection('offices')}
              className="flex items-center justify-between w-full text-left group"
            >
              <span className="text-sm font-medium text-gray-900 uppercase tracking-wider">
                {t('offices')}
              </span>
              <span className="text-lg text-gray-600 group-hover:text-gray-900 transition-colors">
                {expandedSections.offices ? '−' : '+'}
              </span>
            </button>
            
            {expandedSections.offices && (
              <div className="mt-4 space-y-3">
                {footerData.offices.map((item, index) => (
                  <div key={index}>
                    <div className="text-xs font-medium text-gray-900 uppercase tracking-wider mb-1">
                      {item.label}
                    </div>
                    <div className="text-sm text-gray-600">
                      {item.value}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* SOCIAL Section */}
          <div>
            <button
              onClick={() => toggleSection('social')}
              className="flex items-center justify-between w-full text-left group"
            >
              <span className="text-sm font-medium text-gray-900 uppercase tracking-wider">
                {t('social')}
              </span>
              <span className="text-lg text-gray-600 group-hover:text-gray-900 transition-colors">
                {expandedSections.social ? '−' : '+'}
              </span>
            </button>
            
            {expandedSections.social && (
              <div className="mt-4 space-y-3">
                {footerData.social.map((item, index) => (
                  <div key={index}>
                    <div className="text-xs font-medium text-gray-900 uppercase tracking-wider mb-1">
                      {item.label}
                    </div>
                    <a 
                      href={item.value}
                      className="text-sm text-gray-600 hover:text-gray-900 underline transition-colors"
                    >
                      {item.value}
                    </a>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* LEGAL Section */}
          {/* <div>
            <button
              onClick={() => toggleSection('legal')}
              className="flex items-center justify-between w-full text-left group"
            >
              <span className="text-sm font-medium text-gray-900 uppercase tracking-wider">
                {t('legal')}
              </span>
              <span className="text-lg text-gray-600 group-hover:text-gray-900 transition-colors">
                {expandedSections.legal ? '−' : '+'}
              </span>
            </button>
            
            {expandedSections.legal && (
              <div className="mt-4 space-y-3">
                {footerData.legal.map((item, index) => (
                  <div key={index}>
                    <div className="text-xs font-medium text-gray-900 uppercase tracking-wider mb-1">
                      {item.label}
                    </div>
                    <a 
                      href="#"
                      className="text-sm text-gray-600 hover:text-gray-900 underline transition-colors"
                    >
                      {item.value}
                    </a>
                  </div>
                ))}
              </div>
            )}
          </div> */}

        </div>
      </div>
    </footer>
  );
} 
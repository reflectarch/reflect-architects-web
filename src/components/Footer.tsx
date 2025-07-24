'use client';

import { useState } from 'react';

export default function Footer() {
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
      { label: 'NEW PROJECTS', value: 'newbiz@reflectarchitects.com' },
      { label: 'PRESS', value: 'press@reflectarchitects.com' },
      { label: 'LECTURES', value: 'lectures@reflectarchitects.com' },
      { label: 'EXHIBITIONS', value: 'exhibitions@reflectarchitects.com' },
    ],
    offices: [
      { label: 'NEW YORK', value: '123 Architecture Street, NY 10001' },
      { label: 'LOS ANGELES', value: '456 Design Ave, LA 90210' },
      { label: 'CHICAGO', value: '789 Modern Blvd, Chicago 60601' },
    ],
    social: [
      { label: 'INSTAGRAM', value: '@reflectarchitects' },
      { label: 'LINKEDIN', value: 'Reflect Architects' },
      { label: 'FACEBOOK', value: 'Reflect Architects' },
      { label: 'TWITTER', value: '@reflectarch' },
    ],
    legal: [
      { label: 'PRIVACY POLICY', value: 'View Policy' },
      { label: 'TERMS OF SERVICE', value: 'View Terms' },
      { label: 'COOKIE POLICY', value: 'View Policy' },
      { label: 'LICENSING', value: 'View Licensing' },
    ],
  };

  return (
    <footer className="bg-white border-t border-gray-200  left-0 right-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8">
          
          {/* EMAIL Section */}
          <div>
            <button
              onClick={() => toggleSection('email')}
              className="flex items-center justify-between w-full text-left group"
            >
              <span className="text-sm font-medium text-gray-900 uppercase tracking-wider">
                EMAIL
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
                OFFICES
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
                SOCIAL
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
                      href="#"
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
          <div>
            <button
              onClick={() => toggleSection('legal')}
              className="flex items-center justify-between w-full text-left group"
            >
              <span className="text-sm font-medium text-gray-900 uppercase tracking-wider">
                LEGAL
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
          </div>

        </div>
      </div>
    </footer>
  );
} 
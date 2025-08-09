'use client';

import { useState } from 'react';

export default function Consultation() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    projectType: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/consultation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      await response.json();

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          projectType: '',
          message: ''
        });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white h-full overflow-y-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h1 className="text-4xl font-light text-gray-900 mb-8 tracking-wide">
            GET CONSULTATION
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Schedule a consultation with our expert architects to discuss your project, 
            explore design possibilities, and understand how we can bring your vision to life.
          </p>
        </div>
        
        <div className="mt-8 max-w-3xl mx-auto">
          <div className="bg-gray-50 p-6 mb-6">
            <h2 className="text-2xl font-light text-gray-900 mb-6 tracking-wide">
              CONSULTATION PROCESS
            </h2>
            
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="bg-black text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium">
                  1
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-900 uppercase tracking-wide mb-1">
                    Initial Meeting
                  </h3>
                  <p className="text-gray-600">
                    We&apos;ll discuss your vision, requirements, and project scope in detail.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="bg-black text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium">
                  2
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-900 uppercase tracking-wide mb-1">
                    Site Analysis
                  </h3>
                  <p className="text-gray-600">
                    We&apos;ll evaluate your site and provide professional recommendations.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="bg-black text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium">
                  3
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-900 uppercase tracking-wide mb-1">
                    Proposal
                  </h3>
                  <p className="text-gray-600">
                    Based on your needs, we&apos;ll prepare a detailed proposal outlining our approach, timeline, and fees.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <h2 className="text-2xl font-light text-gray-900 mb-6 tracking-wide">
              BOOK YOUR CONSULTATION
            </h2>
            
            {submitStatus === 'success' && (
              <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 mb-4">
                Thank you! Your consultation request has been submitted successfully. We&apos;ll get back to you soon.
              </div>
            )}
            
            {submitStatus === 'error' && (
              <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 mb-4">
                Sorry, there was an error submitting your request. Please try again.
              </div>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="First Name"
                  required
                  className="w-full px-0 py-3 border-0 border-b border-gray-300 bg-transparent text-gray-900 placeholder-gray-500 focus:border-black focus:outline-none focus:ring-0"
                />
              </div>
              
              <div>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Last Name"
                  required
                  className="w-full px-0 py-3 border-0 border-b border-gray-300 bg-transparent text-gray-900 placeholder-gray-500 focus:border-black focus:outline-none focus:ring-0"
                />
              </div>
            </div>
            
            <div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                required
                className="w-full px-0 py-3 border-0 border-b border-gray-300 bg-transparent text-gray-900 placeholder-gray-500 focus:border-black focus:outline-none focus:ring-0"
              />
            </div>
            
            <div>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone"
                className="w-full px-0 py-3 border-0 border-b border-gray-300 bg-transparent text-gray-900 placeholder-gray-500 focus:border-black focus:outline-none focus:ring-0"
              />
            </div>
            
            <div>
              <select 
                name="projectType"
                value={formData.projectType}
                onChange={handleChange}
                className="w-full px-0 py-3 border-0 border-b border-gray-300 bg-transparent text-gray-900 focus:border-black focus:outline-none focus:ring-0"
              >
                <option value="">Project Type</option>
                <option value="residential">Residential</option>
                <option value="commercial">Commercial</option>
                <option value="renovation">Renovation</option>
                <option value="interior">Interior Design</option>
                <option value="other">Other</option>
              </select>
            </div>
            
            <div>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                placeholder="Tell us about your project"
                required
                className="w-full px-0 py-3 border-0 border-b border-gray-300 bg-transparent text-gray-900 placeholder-gray-500 focus:border-black focus:outline-none focus:ring-0 resize-none"
              ></textarea>
            </div>
            
            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-black text-white px-8 py-3 text-sm font-medium tracking-wider uppercase hover:bg-gray-800 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Submitting...' : 'Schedule Consultation'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 
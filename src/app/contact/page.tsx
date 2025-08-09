'use client';

import { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({
          name: '',
          email: '',
          subject: '',
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
            CONTACT US
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Ready to start your architectural journey? Get in touch with us 
            to discuss your project and discover how we can bring your vision to life.
          </p>
        </div>
        
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-light text-gray-900 mb-6 tracking-wide">
              GET IN TOUCH
            </h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-900 uppercase tracking-wide mb-2">
                  Office
                </h3>
                <p className="text-gray-600">
                  123 Architecture Street<br/>
                  Design District<br/>
                  New York, NY 10001
                </p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-900 uppercase tracking-wide mb-2">
                  Phone
                </h3>
                <p className="text-gray-600">+1 (555) 123-4567</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-900 uppercase tracking-wide mb-2">
                  Email
                </h3>
                <p className="text-gray-600">info@reflectarchitects.com</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-900 uppercase tracking-wide mb-2">
                  Business Hours
                </h3>
                <p className="text-gray-600">
                  Monday - Friday: 9:00 AM - 6:00 PM<br/>
                  Saturday: 10:00 AM - 4:00 PM<br/>
                  Sunday: Closed
                </p>
              </div>
            </div>
          </div>
          
          <div>
            <h2 className="text-2xl font-light text-gray-900 mb-6 tracking-wide">
              SEND A MESSAGE
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              {submitStatus === 'success' && (
                <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 mb-4">
                  Thank you! Your message has been sent successfully. We'll get back to you soon.
                </div>
              )}
              
              {submitStatus === 'error' && (
                <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 mb-4">
                  Sorry, there was an error sending your message. Please try again.
                </div>
              )}
              
              <div>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Name"
                  required
                  className="w-full px-0 py-3 border-0 border-b border-gray-300 bg-transparent text-gray-900 placeholder-gray-500 focus:border-black focus:outline-none focus:ring-0"
                />
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
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Subject"
                  className="w-full px-0 py-3 border-0 border-b border-gray-300 bg-transparent text-gray-900 placeholder-gray-500 focus:border-black focus:outline-none focus:ring-0"
                />
              </div>
              
              <div>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Message"
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
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
} 
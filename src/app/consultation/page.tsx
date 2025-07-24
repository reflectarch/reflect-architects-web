export default function Consultation() {
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
                    We'll discuss your vision, requirements, and project scope in detail.
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
                    We'll evaluate your site and provide professional recommendations.
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
                    Receive a detailed proposal with timeline, budget, and design approach.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <form className="space-y-4">
            <h2 className="text-2xl font-light text-gray-900 mb-6 tracking-wide">
              BOOK YOUR CONSULTATION
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <input
                  type="text"
                  placeholder="First Name"
                  className="w-full px-0 py-3 border-0 border-b border-gray-300 bg-transparent text-gray-900 placeholder-gray-500 focus:border-black focus:outline-none focus:ring-0"
                />
              </div>
              
              <div>
                <input
                  type="text"
                  placeholder="Last Name"
                  className="w-full px-0 py-3 border-0 border-b border-gray-300 bg-transparent text-gray-900 placeholder-gray-500 focus:border-black focus:outline-none focus:ring-0"
                />
              </div>
            </div>
            
            <div>
              <input
                type="email"
                placeholder="Email"
                className="w-full px-0 py-3 border-0 border-b border-gray-300 bg-transparent text-gray-900 placeholder-gray-500 focus:border-black focus:outline-none focus:ring-0"
              />
            </div>
            
            <div>
              <input
                type="tel"
                placeholder="Phone"
                className="w-full px-0 py-3 border-0 border-b border-gray-300 bg-transparent text-gray-900 placeholder-gray-500 focus:border-black focus:outline-none focus:ring-0"
              />
            </div>
            
            <div>
              <select className="w-full px-0 py-3 border-0 border-b border-gray-300 bg-transparent text-gray-900 focus:border-black focus:outline-none focus:ring-0">
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
                rows={4}
                placeholder="Tell us about your project"
                className="w-full px-0 py-3 border-0 border-b border-gray-300 bg-transparent text-gray-900 placeholder-gray-500 focus:border-black focus:outline-none focus:ring-0 resize-none"
              ></textarea>
            </div>
            
            <div>
              <button
                type="submit"
                className="bg-black text-white px-8 py-3 text-sm font-medium tracking-wider uppercase hover:bg-gray-800 transition-colors duration-200"
              >
                Schedule Consultation
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 
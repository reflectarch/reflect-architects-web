export default function About() {
  return (
    <div className="bg-white h-full overflow-y-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h1 className="text-4xl font-light text-gray-900 mb-8 tracking-wide">
            ABOUT US
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            We are a team of passionate architects dedicated to creating 
            innovative, sustainable, and timeless designs that enhance 
            the human experience and respect the environment.
          </p>
        </div>
        
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-light text-gray-900 mb-6 tracking-wide">
              OUR PHILOSOPHY
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              Architecture is more than just building structures; it&apos;s about 
              creating spaces that inspire, comfort, and connect people with 
              their environment. We believe in a holistic approach that 
              considers not just the aesthetic and functional aspects of design, 
              but also its impact on sustainability and community.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Every project we undertake is guided by principles of innovation, 
              environmental responsibility, and timeless design. We strive to 
              create buildings that will stand the test of time, both 
              structurally and aesthetically.
            </p>
          </div>
          
          <div>
            <h2 className="text-2xl font-light text-gray-900 mb-6 tracking-wide">
              OUR TEAM
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              Our diverse team brings together decades of experience in 
              architectural design, urban planning, and sustainable 
              construction. We collaborate closely with clients, engineers, 
              and contractors to ensure every project exceeds expectations.
            </p>
            <div className="space-y-3">
              <div>
                <h3 className="text-sm font-medium text-gray-900 uppercase tracking-wide">
                  Founded
                </h3>
                <p className="text-gray-600">2010</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-900 uppercase tracking-wide">
                  Projects Completed
                </h3>
                <p className="text-gray-600">150+</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-900 uppercase tracking-wide">
                  Awards
                </h3>
                <p className="text-gray-600">25+</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 
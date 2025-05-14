import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { CiCircleChevDown } from 'react-icons/ci';
import { FiUsers, FiBookOpen, FiAward, FiTrendingUp } from 'react-icons/fi';

export default function Home() {
  return (
    <main className="overflow-hidden">
      {/* Hero Section with Abstract Background Elements */}
      <section className="relative flex flex-col items-center justify-center min-h-screen px-4 py-16 overflow-hidden">
        {/* Abstract Background Elements */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
          <div className="absolute top-1/3 right-1/3 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
          <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-emerald-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
        </div>

        <div className="flex flex-col items-center text-center gap-1 md:gap-4 max-w-4xl mx-auto">
          <div className="inline-block mb-3 px-4 py-1 bg-emerald-100 rounded-full">
            <span className="text-emerald-800 font-medium text-sm">
              🚀 Connecting Students Like Never Before
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold font-inter text-emerald-800 leading-tight">
            Bridge the Campus Gap
          </h1>
          <p className="text-xl sm:text-2xl md:text-4xl font-gilroy font-bold mt-2 md:mt-4 text-gray-700">
            Connect. Learn. Grow.
          </p>
          <p className="mt-4 mb-6 text-gray-600 max-w-2xl">
            The ultimate platform for students to collaborate, share resources, and build meaningful
            connections across campuses nationwide.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <Link
              href="/login"
              className="px-8 pyd-6 w-fit flex justify-center items-center rounded-full bg-emerald-800 text-white hover:bg-emerald-700 transition-colors"
            >
              Get Started
            </Link>
            <Button className="px-8 py-6 rounded-full bg-white border border-emerald-800 text-emerald-800 hover:bg-emerald-50 transition-colors">
              Watch Demo
            </Button>
          </div>

          <div className="mt-8 flex items-center">
            <div className="flex -space-x-2">
              {[
                { number: 1, bgColor: 'bg-emerald-200' },
                { number: 2, bgColor: 'bg-emerald-300' },
                { number: 3, bgColor: 'bg-emerald-400' },
                { number: 4, bgColor: 'bg-emerald-500' },
              ].map((item) => (
                <div
                  key={item.number}
                  className={`w-8 h-8 rounded-full border-2 border-white ${item.bgColor} flex items-center justify-center text-xs font-bold text-white`}
                >
                  {item.number}
                </div>
              ))}
            </div>
            <p className="ml-4 text-sm text-gray-600">
              Join <span className="font-bold text-emerald-800">1,234+</span> students already
              connecting
            </p>
          </div>
        </div>

        {/* Down Arrow - positioned at bottom of hero */}
        <div className="absolute bottom-8 w-full flex justify-center">
          <a href="#content" className="flex items-center flex-col">
            <span className="text-sm text-emerald-800 mb-2">Explore Benefits</span>
            <CiCircleChevDown className="animate-bounce text-4xl text-emerald-800 cursor-pointer hover:scale-110 transition-transform" />
          </a>
        </div>
      </section>

      {/* Features Section */}
      <section id="content" className="py-20 bg-gradient-to-b from-emerald-50 to-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-emerald-800 mb-4">
              Discover What We Offer
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Our platform is designed to help students overcome challenges and build meaningful
              connections that last beyond graduation.
            </p>
          </div>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <FiUsers className="h-8 w-8" />,
                title: 'Connect',
                description:
                  'Find students with similar interests or study goals across different campuses',
              },
              {
                icon: <FiBookOpen className="h-8 w-8" />,
                title: 'Learn',
                description: 'Access shared study resources and collaborate on academic projects',
              },
              {
                icon: <FiAward className="h-8 w-8" />,
                title: 'Achieve',
                description: 'Track your progress and celebrate achievements with your peers',
              },
              {
                icon: <FiTrendingUp className="h-8 w-8" />,
                title: 'Grow',
                description: 'Develop valuable skills and build your professional network early',
              },
            ].map((feature, i) => (
              <div
                key={i}
                className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100"
              >
                <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-800 mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-emerald-800 mb-4">What Students Say</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Hear from students who have transformed their campus experience with our platform
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: 'Alex Johnson',
                university: 'Stanford University',
                quote:
                  'This platform completely changed how I collaborate with peers. I&apos;ve made connections that will last a lifetime.',
              },
              {
                name: 'Maria Garcia',
                university: 'NYU',
                quote:
                  'As a first-generation student, I struggled to find my place. This community helped me find mentors and friends who understand my journey.',
              },
              {
                name: 'Jamal Williams',
                university: 'Howard University',
                quote:
                  'The resources shared here helped me ace my classes and land my dream internship. Can&apos;t recommend it enough!',
              },
            ].map((testimonial, i) => (
              <div key={i} className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                <div className="flex items-center mb-4">
                  <div className="h-10 w-10 bg-emerald-200 rounded-full flex items-center justify-center text-emerald-800 font-bold">
                    {testimonial.name[0]}
                  </div>
                  <div className="ml-3">
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-500">{testimonial.university}</p>
                  </div>
                </div>
                <p className="text-gray-600 italic">&ldquo;{testimonial.quote}&rdquo;</p>
                <div className="mt-4 flex text-emerald-500">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span key={star}>★</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-emerald-800 text-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { number: '10,000+', label: 'Active Students' },
              { number: '200+', label: 'Universities' },
              { number: '5,000+', label: 'Study Resources' },
              { number: '98%', label: 'Satisfaction Rate' },
            ].map((stat, i) => (
              <div key={i}>
                <div className="text-4xl md:text-5xl font-bold">{stat.number}</div>
                <p className="text-emerald-200 mt-2">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <div className="bg-gradient-to-r from-emerald-50 to-blue-50 rounded-2xl p-8 md:p-12 shadow-sm">
            <h2 className="text-3xl md:text-4xl font-bold text-emerald-800 mb-4">
              Ready to Transform Your Campus Experience?
            </h2>
            <p className="text-gray-600 mb-8 max-w-3xl mx-auto">
              Join thousands of students already connecting, sharing, and growing together.
            </p>
            <Button className="px-8 py-6 rounded-full bg-emerald-800 text-white hover:bg-emerald-700 transition-colors">
              Get Started Today
            </Button>
            <p className="mt-4 text-sm text-gray-500">
              No credit card required • Free for students
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-gray-50 border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-emerald-800 flex items-center justify-center text-white font-bold text-xl">
                  A
                </div>
                <span className="ml-2 text-xl font-bold text-emerald-800">Alumnity</span>
              </div>
              <p className="text-gray-500 mt-2">© 2025 Alumnity. All rights reserved.</p>
            </div>
            <div className="flex gap-6">
              <a href="#" className="text-gray-600 hover:text-emerald-800">
                About
              </a>
              <a href="#" className="text-gray-600 hover:text-emerald-800">
                Features
              </a>
              <a href="#" className="text-gray-600 hover:text-emerald-800">
                Testimonials
              </a>
              <a href="#" className="text-gray-600 hover:text-emerald-800">
                Contact
              </a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}

'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { CiCircleChevDown } from 'react-icons/ci';
import { FiUsers, FiBookOpen, FiAward, FiTrendingUp } from 'react-icons/fi';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5 },
  },
};

export default function Home() {
  const heroRef = useRef(null);
  const featuresRef = useRef(null);
  const testimonialsRef = useRef(null);
  const ctaRef = useRef(null);

  const heroInView = useInView(heroRef, { once: true, amount: 0.3 });
  const featuresInView = useInView(featuresRef, { once: true, amount: 0.2 });
  const testimonialsInView = useInView(testimonialsRef, { once: true, amount: 0.2 });
  const ctaInView = useInView(ctaRef, { once: true, amount: 0.3 });

  return (
    <main className="overflow-hidden font-inter">
      {/* Hero Section with Abstract Background Elements */}
      <section
        ref={heroRef}
        className="relative flex flex-col items-center justify-center min-h-screen px-4 py-16 overflow-hidden bg-gradient-to-br from-rose-100 via-indigo-100 to-indigo-200"
      >
        {/* Abstract Background Elements */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <motion.div
            animate={{
              x: [0, 30, 0],
              y: [0, -20, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-rose-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40"
          />
          <motion.div
            animate={{
              x: [0, -20, 0],
              y: [0, 25, 0],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 2,
            }}
            className="absolute top-1/3 right-1/3 w-80 h-80 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
          />
          <motion.div
            animate={{
              x: [0, 15, 0],
              y: [0, -15, 0],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 4,
            }}
            className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-35"
          />
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={heroInView ? 'visible' : 'hidden'}
          className="flex flex-col items-center text-center gap-1 md:gap-4 max-w-4xl mx-auto"
        >
          <motion.div
            variants={fadeInUp}
            className="inline-block mb-3 px-4 py-1 bg-rose-200 rounded-full"
          >
            <span className="text-indigo-700 font-medium text-sm">
              🚀 Connecting Students Like Never Before
            </span>
          </motion.div>

          <motion.h1
            variants={fadeInUp}
            className="text-3xl sm:text-5xl md:text-7xl font-bold font-inter text-indigo-800 leading-tight"
          >
            Bridge the Campus Gap
          </motion.h1>
          <motion.p
            variants={fadeInUp}
            className="text-xl sm:text-2xl md:text-4xl font-bold mt-2 md:mt-4 text-indigo-600"
          >
            Connect. Learn. Grow.
          </motion.p>
          <motion.p variants={fadeInUp} className="mt-4 mb-6 text-gray-600 max-w-2xl">
            The ultimate platform for students to collaborate, share resources, and build meaningful
            connections across campuses nationwide.
          </motion.p>

          <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 mt-6">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/auth/login"
                className="px-8 py-6 w-fit flex justify-center items-center rounded-full bg-indigo-600 text-white hover:bg-indigo-700 transition-colors shadow-lg hover:shadow-xl"
              >
                Get Started
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/#"
                className="px-8 py-6 w-fit flex justify-center items-center rounded-full hover:bg-indigo-500 hover:text-white text-indigo-600 bg-indigo-50 border border-indigo-600 transition-colors shadow-lg hover:shadow-xl"
              >
                Watch Demo
              </Link>
            </motion.div>
          </motion.div>

          <motion.div variants={fadeInUp} className="mt-8 flex items-center">
            <div className="flex -space-x-2">
              {[
                { number: 1, bgColor: 'bg-rose-200' },
                { number: 2, bgColor: 'bg-indigo-200' },
                { number: 3, bgColor: 'bg-indigo-300' },
                { number: 4, bgColor: 'bg-indigo-400' },
              ].map((item) => (
                <motion.div
                  key={item.number}
                  whileHover={{ scale: 1.1 }}
                  className={`w-8 h-8 rounded-full border-2 border-white ${item.bgColor} flex items-center justify-center text-xs font-bold text-white`}
                >
                  {item.number}
                </motion.div>
              ))}
            </div>
            <p className="ml-4 text-sm text-gray-600">
              Join <span className="font-bold text-indigo-700">1,234+</span> students already
              connecting
            </p>
          </motion.div>
        </motion.div>

        {/* Down Arrow - positioned at bottom of hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="absolute bottom-8 w-full flex justify-center"
        >
          <a href="#content" className="flex items-center flex-col group">
            <span className="text-sm text-indigo-700 mb-2 group-hover:text-indigo-800 transition-colors">
              Explore Benefits
            </span>
            <CiCircleChevDown className="animate-bounce text-4xl text-indigo-700 cursor-pointer hover:scale-110 transition-transform group-hover:text-indigo-800" />
          </a>
        </motion.div>
      </section>

      {/* Features Section */}
      <section
        ref={featuresRef}
        id="content"
        className="py-20 bg-gradient-to-b from-indigo-100 to-white"
      >
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={featuresInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-indigo-800 mb-4">
              Discover What We Offer
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Our platform is designed to help students overcome challenges and build meaningful
              connections that last beyond graduation.
            </p>
          </motion.div>

          {/* Feature Cards */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={featuresInView ? 'visible' : 'hidden'}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
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
              <motion.div
                key={i}
                variants={scaleIn}
                whileHover={{ y: -10, scale: 1.02 }}
                className="bg-white p-6 rounded-xl shadow-sm hover:shadow-lg transition-shadow border border-gray-100"
              >
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-rose-200 to-indigo-200 flex items-center justify-center text-indigo-700 mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section ref={testimonialsRef} className="py-20 bg-gradient-to-b from-white to-rose-100">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={testimonialsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-indigo-800 mb-4">What Students Say</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Hear from students who have transformed their campus experience with our platform
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={testimonialsInView ? 'visible' : 'hidden'}
            className="grid md:grid-cols-3 gap-8"
          >
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
              <motion.div
                key={i}
                variants={scaleIn}
                whileHover={{ y: -5 }}
                className="bg-white/70 backdrop-blur-sm p-6 rounded-xl border border-indigo-100 shadow-sm hover:shadow-md transition-all"
              >
                <div className="flex items-center mb-4">
                  <div className="h-10 w-10 bg-gradient-to-br from-rose-200 to-indigo-200 rounded-full flex items-center justify-center text-indigo-700 font-bold">
                    {testimonial.name[0]}
                  </div>
                  <div className="ml-3">
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-500">{testimonial.university}</p>
                  </div>
                </div>
                <p className="text-gray-600 italic">&ldquo;{testimonial.quote}&rdquo;</p>
                <div className="mt-4 flex text-indigo-400">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span key={star}>★</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-indigo-600 to-indigo-800 text-white">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
          >
            {[
              { number: '10,000+', label: 'Active Students' },
              { number: '200+', label: 'Universities' },
              { number: '5,000+', label: 'Study Resources' },
              { number: '98%', label: 'Satisfaction Rate' },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
              >
                <div className="text-4xl md:text-5xl font-bold">{stat.number}</div>
                <p className="text-indigo-200 mt-2">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section ref={ctaRef} className="py-20 bg-gradient-to-b from-rose-100 to-indigo-100">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={ctaInView ? 'visible' : 'hidden'}
            className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 md:p-12 shadow-lg border border-indigo-100"
          >
            <motion.h2
              variants={fadeInUp}
              className="text-3xl md:text-4xl font-bold text-indigo-800 mb-4"
            >
              Ready to Transform Your Campus Experience?
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-gray-600 mb-8 max-w-3xl mx-auto">
              Join thousands of students already connecting, sharing, and growing together.
            </motion.p>
            <motion.div variants={fadeInUp} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button className="px-8 py-6 rounded-full bg-indigo-600 text-white hover:bg-indigo-700 transition-colors shadow-lg hover:shadow-xl">
                Get Started Today
              </Button>
            </motion.div>
            <motion.p variants={fadeInUp} className="mt-4 text-sm text-gray-500">
              No credit card required • Free for students
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-white border-t border-indigo-100">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-rose-400 to-indigo-600 flex items-center justify-center text-white font-bold text-xl">
                  A
                </div>
                <span className="ml-2 text-xl font-bold text-indigo-800">Alumnity</span>
              </div>
              <p className="text-gray-500 mt-2">© 2025 Alumnity. All rights reserved.</p>
            </div>
            <div className="flex gap-6">
              <a href="#" className="text-gray-600 hover:text-indigo-700 transition-colors">
                About
              </a>
              <a href="#" className="text-gray-600 hover:text-indigo-700 transition-colors">
                Features
              </a>
              <a href="#" className="text-gray-600 hover:text-indigo-700 transition-colors">
                Testimonials
              </a>
              <a href="#" className="text-gray-600 hover:text-indigo-700 transition-colors">
                Contact
              </a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}

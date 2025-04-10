"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function Home() {
  // Motion variants for container animations
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="container mx-auto flex items-center justify-between py-6 px-4">
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-4xl font-bold"
        >
          DocSys Manage
        </motion.h1>
        <nav className="space-x-4">
          <Link href="/auth/login" passHref>
            <motion.a
              whileHover={{ scale: 1.1 }}
              className="px-4 py-2 border border-white rounded hover:bg-white hover:text-black transition"
            >
              Login
            </motion.a>
          </Link>
          <Link href="/auth/signup" passHref>
            <motion.a
              whileHover={{ scale: 1.1 }}
              className="px-4 py-2 border border-white rounded hover:bg-white hover:text-black transition"
            >
              Register
            </motion.a>
          </Link>
        </nav>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4">
        {/* Hero Section */}
        <motion.section
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="flex flex-col items-center justify-center min-h-[70vh] text-center"
        >
          <motion.h2
            variants={containerVariants}
            className="text-5xl md:text-6xl font-bold mb-4"
          >
            Welcome to DocSys Manage
          </motion.h2>
          <motion.p
            variants={containerVariants}
            className="text-xl md:text-2xl mb-10 max-w-2xl"
          >
            Collaborate, share, and search your documents with ease using our
            state-of-the-art document management system.
          </motion.p>
          <motion.div variants={containerVariants} className="flex space-x-4">
            <Link href="/auth/login" passHref>
              <motion.a
                whileHover={{ scale: 1.1 }}
                className="px-6 py-3 border border-white rounded hover:bg-white hover:text-black transition"
              >
                Login
              </motion.a>
            </Link>
            <Link href="/auth/signup" passHref>
              <motion.a
                whileHover={{ scale: 1.1 }}
                className="px-6 py-3 border border-white rounded hover:bg-white hover:text-black transition"
              >
                Register
              </motion.a>
            </Link>
          </motion.div>
        </motion.section>

        {/* Features Section */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="py-16"
        >
          <h3 className="text-3xl font-bold text-center mb-12">Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-gray-800 p-6 rounded shadow-lg"
            >
              <h4 className="text-2xl font-semibold mb-2">
                Real-time Collaboration
              </h4>
              <p className="text-gray-300">
                Work together in real-time and keep your team on the same page.
              </p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-gray-800 p-6 rounded shadow-lg"
            >
              <h4 className="text-2xl font-semibold mb-2">
                File &amp; Folder Permissions
              </h4>
              <p className="text-gray-300">
                Securely share files and folders with granular access controls.
              </p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-gray-800 p-6 rounded shadow-lg"
            >
              <h4 className="text-2xl font-semibold mb-2">Deep Search</h4>
              <p className="text-gray-300">
                Effortlessly find what you need in natural language queries with
                our agentic search(RAG)
              </p>
            </motion.div>
          </div>
        </motion.section>

        {/* How It Works Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="py-16 bg-gray-900 rounded-lg"
        >
          <h3 className="text-3xl font-bold text-center mb-12">How It Works</h3>
          <div className="max-w-4xl mx-auto space-y-8">
            <motion.div
              className="flex flex-col md:flex-row items-center"
              whileHover={{ scale: 1.02 }}
            >
              <div className="md:w-1/2 p-4">
                <h4 className="text-2xl font-semibold mb-2">
                  Simple File Upload & Management
                </h4>
                <p className="text-gray-300">
                  Upload, organize, and manage your files effortlessly with our
                  intuitive interface.
                </p>
              </div>
              <div className="md:w-1/2 p-4">
                <img
                  src="https://res.cloudinary.com/cloudinary-marketing/images/v1645222445/website-2021/blog/JavaScript-File-Upload/JavaScript-File-Upload-png?_i=AA"
                  alt="Upload illustration"
                  className="rounded shadow-lg"
                />
              </div>
            </motion.div>
            <motion.div
              className="flex flex-col md:flex-row items-center"
              whileHover={{ scale: 1.02 }}
            >
              <div className="md:w-1/2 p-4 order-2 md:order-1">
                <img
                  src="https://blog.flock.com/hs-fs/hubfs/Skyrocket%20Productivity%20in%20Remote%20Teams.jpg?width=2822&name=Skyrocket%20Productivity%20in%20Remote%20Teams.jpg"
                  alt="Collaboration illustration"
                  className="rounded shadow-lg"
                />
              </div>
              <div className="md:w-1/2 p-4 order-1 md:order-2">
                <h4 className="text-2xl font-semibold mb-2">
                  Seamless Collaboration & Sharing
                </h4>
                <p className="text-gray-300">
                  Invite team members, share files securely, and track every
                  activity in real-time.
                </p>
              </div>
            </motion.div>
            <motion.div
              className="flex flex-col md:flex-row items-center"
              whileHover={{ scale: 1.02 }}
            >
              <div className="md:w-1/2 p-4">
                <h4 className="text-2xl font-semibold mb-2">
                  Intelligent Document Search
                </h4>
                <p className="text-gray-300">
                  Our deep search engine lets you find any document, even by
                  searching its content.
                </p>
              </div>
              <div className="md:w-1/2 p-4">
                <img
                  src="https://info.bai.org/rs/415-RKB-576/images/intelligent-document-processing-social.jpg"
                  alt="Search illustration"
                  className="rounded shadow-lg"
                />
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* Testimonials Section */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="py-16"
        >
          <h3 className="text-3xl font-bold text-center mb-12">
            What Our Users Say
          </h3>
          <div className="max-w-4xl mx-auto space-y-8">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-gray-800 p-6 rounded shadow-lg"
            >
              <p className="text-gray-300 italic">
                "DocSys Manage has completely transformed the way our team
                collaborates. The real-time notifications and deep search
                features are simply amazing!"
              </p>
              <p className="mt-4 text-right font-semibold">- John Doe</p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-gray-800 p-6 rounded shadow-lg"
            >
              <p className="text-gray-300 italic">
                "The intuitive design and powerful file sharing capabilities
                make document management a breeze. Highly recommended!"
              </p>
              <p className="mt-4 text-right font-semibold">- Jane Smith</p>
            </motion.div>
          </div>
        </motion.section>
      </main>

      {/* Footer */}
      <footer className="container mx-auto text-center py-8 px-4 border-t border-gray-700">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} DocSys Manage. All rights reserved.
        </p>
        <p className="text-sm mt-2">
          Built with Next.js, Tailwind CSS, and Framer Motion.
        </p>
      </footer>
    </div>
  );
}

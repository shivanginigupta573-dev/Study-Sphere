// src/Components/Footer.jsx
import { FaGithub, FaLinkedin, FaTwitter, FaHeart } from "react-icons/fa";

import { IoBookOutline } from "react-icons/io5";

const Footer = () => {
  return (
    <footer className="w-full mt-10 px-4 sm:px-6 pb-6">
      <div className="max-w-6xl mx-auto">
        <div className="glass rounded-3xl px-6 py-8 md:px-10 md:py-10 border border-white/20 dark:border-white/10 shadow-xl">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-10">
            <div className="max-w-sm">
              <div className="flex items-center gap-3">
                <div className="h-11 w-11 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center shadow-lg">
                  <IoBookOutline className="text-white" size={22} />
                </div>

                <div>
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
                    StudySphere
                  </h2>

                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Smart study planner for focused learning.
                  </p>
                </div>
              </div>

              <p className="mt-4 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                Organize study sessions, track productivity, and stay focused
                with a clean and distraction-free workspace.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-4 text-gray-800 dark:text-gray-200">
                Quick Links
              </h3>

              <ul className="space-y-3">
                {[
                  { name: "Planner", href: "/" },
                  { name: "Timer", href: "/timer" },
                  { name: "Dashboard", href: "/dashboard" },
                ].map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-gray-600 dark:text-gray-400 hover:text-indigo-500 dark:hover:text-indigo-400 transition-all duration-300 hover:translate-x-1 inline-block"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-4 text-gray-800 dark:text-gray-200">
                Connect
              </h3>

              <div className="flex items-center gap-4">
                {[
                  {
                    icon: <FaGithub size={20} />,
                    href: "https://github.com/shivanginigupta573-dev",
                  },
                  {
                    icon: <FaLinkedin size={20} />,
                    href: "https://linkedin.com", 
                  },
                  {
                    icon: <FaTwitter size={20} />,
                    href: "https://twitter.com",
                  },
                ].map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    className="h-11 w-11 rounded-2xl bg-white/60 dark:bg-white/5 border border-gray-200 dark:border-gray-700 flex items-center justify-center text-gray-700 dark:text-gray-300 hover:bg-gradient-to-r hover:from-indigo-500 hover:to-purple-500 hover:text-white hover:scale-110 transition-all duration-300 shadow-md"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>


          <div className="my-6 h-[1px] bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-700 to-transparent" />


          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-gray-500 dark:text-gray-400">
            <p>
              © {new Date().getFullYear()} StudySphere. All rights reserved.
            </p>

            <p className="flex items-center gap-1">
              Made with
              <FaHeart size={15} className="text-pink-500" />
              using React + Tailwind
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

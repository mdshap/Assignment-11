import { FaFacebookF, FaInstagram, FaYoutube, FaGithub } from "react-icons/fa";
import { IoSchool } from "react-icons/io5";

const Footer = () => {
  return (
    <footer className="mt-24 bg-gradient-to-b from-green-50 via-white to-green-100 border-t border-green-200">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-start">
          <div className="text-center md:text-left">
            <h2 className="text-3xl font-extrabold bg-clip-text t">
              <a
                className="btn btn-ghost text-lg sm:text-3xl font-bold hover:bg-transparent hover:border-0"
                href="/">
                <IoSchool className="text-green-600" />
                Scholar<span className="text-green-600">Stream</span>
              </a>
            </h2>

            <p className="mt-4 text-sm text-gray-600 leading-relaxed max-w-sm mx-auto md:mx-0">
              A modern scholarship management platform helping students discover
              opportunities, track applications, and achieve academic success
              worldwide.
            </p>

            <div className="flex justify-center md:justify-start gap-4 mt-6">
              {[
                { icon: <FaFacebookF />, link: "http://www.facbook.com/ShapXD2" },
                { icon: <FaInstagram />, link: "https://www.instagram.com/shap_xd" },
                { icon: <FaYoutube />, link: "https://www.youtube.com/@tasimtalks" },
                { icon: <FaGithub />, link: "https://github.com/mdshap" },
              ].map((s, i) => (
                <a
                  key={i}
                  href={s.link}
                  target="_blank"
                  className="
                    w-10 h-10 flex items-center justify-center
                    rounded-full
                    bg-white
                    shadow-md
                    text-green-600
                    hover:bg-gradient-to-r hover:from-green-500 hover:to-emerald-500
                    hover:text-white
                    transition-all duration-300
                  ">
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          <div className="text-center md:text-left">
            <h4 className="text-lg font-semibold text-gray-800 mb-4">
              About & Support
            </h4>

            <ul className="space-y-2 text-sm text-gray-600">
              <li className="hover:text-green-600 transition cursor-pointer">
                About Us
              </li>
              <li className="hover:text-green-600 transition cursor-pointer">
                Privacy Policy
              </li>
              <li className="hover:text-green-600 transition cursor-pointer">
                Terms & Conditions
              </li>
              <li className="hover:text-green-600 transition cursor-pointer">
                Contact Support
              </li>
            </ul>
          </div>
          <div className="flex flex-col items-center  text-center md:text-left">
            <h4 className="text-lg font-semibold text-gray-800 mb-6">
              Crafted By
            </h4>

            <div className="relative group">
              <div className="absolute -inset-2 rounded-full bg-gradient-to-tr from-green-400 via-emerald-300 to-green-600 blur-xl opacity-40 group-hover:opacity-70 transition"></div>

              <div className="relative w-36 h-36 rounded-full bg-gradient-to-tr from-green-500 via-emerald-400 to-green-700 p-[3px]">
                <div className="w-full h-full rounded-full bg-white p-1 overflow-hidden">
                  <img
                    src="https://i.ibb.co/RTSpdLw6/myimage.jpg"
                    alt="Md. Shaptarshi"
                    className="w-full h-full rounded-full object-cover"
                  />
                </div>
              </div>
            </div>

            <div className="mt-5">
              <p className="text-lg font-bold bg-gradient-to-r from-green-600 to-emerald-500 bg-clip-text text-center text-transparent tracking-wide">
                Md. Shaptarshi
              </p>
              <p className="text-sm text-gray-600 mt-1">
                Aspiring Software Developer
              </p>
            </div>
          </div>
        </div>

        <div className="mt-14 pt-6 border-t border-green-200 text-center">
          <p className="text-sm text-gray-600">
            © {new Date().getFullYear()} Scholar Stream · All Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

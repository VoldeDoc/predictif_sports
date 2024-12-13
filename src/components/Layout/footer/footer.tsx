import { LuUser2 } from "react-icons/lu";
export default function Footer() {
  return (
    <>
      <footer className="w-full py-14 sm:px-16 px-8 text-center sm:text-left text-white bg-dark">
        <div className="container mx-auto">
          <div className="flex flex-wrap pb-11 mb-11">
            <div className="w-full lg:w-1/2 pb-5">
              <h1 className="text-2xl font-bold">
                Join our newsletter to
              </h1>
              <h1 className="text-2xl font-bold pb-3">
                keep up to date with us!
              </h1>

            </div>
            <div className="w-full lg:w-1/2 pb-5 flex flex-col justify-end">
              <div className="flex flex-col sm:flex-row sm:space-x-7 mt-auto pl-0 sm:pl-16">
                <div className="mb-4 sm:mb-0 relative">
                  <input
                    type="text"
                    placeholder="Enter Your email "
                    className="sm:w-80 w-full py-2 pl-10 pr-3 rounded-xl text-white bg-transparent border border-white  "
                  />
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <LuUser2 className="text-gray-400" />
                  </span>
                </div>
                <div>
                  <button className="bg-white py-2 px-5 rounded-2xl text-black-500 font-semibold">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          </div>
          <hr className="border-white" />

          <div className="flex flex-wrap mb-11 py-11">
            <div className="w-full lg:w-1/2 pb-5">
              <div className="flex sm:justify-start justify-center ">
                <img src="assets/images/logo.png" alt="Logo" />
              </div>

            </div>
            <div className="w-full lg:w-1/2 pb-5 flex flex-col justify-end">
              <div className="flex flex-col sm:flex-row sm:space-x-20 mt-auto pl-0 sm:pl-16 sm:space-y-0 space-y-8">
                <div>
                  <ul className="lg:space-y-2">
                    <li className="hover:text-slate-900 font-semibold">
                      <a href="#">Platform</a>
                    </li>
                    <li className="hover:text-slate-900 font-semibold">
                      <a href="#">Plans & Pricing</a>
                    </li>
                    <li className="hover:text-slate-900 font-semibold">
                      <a href="#">Personal AI Manager</a>
                    </li>
                    <li className="hover:text-slate-900 font-semibold">
                      <a href="#">AI Sport</a>
                    </li>

                  </ul>
                </div>
                <div className="">
                  <ul className="space-y-2">
                    <li className="hover:text-slate-900 font-semibold">
                      <a href="#">Company</a>
                    </li>
                    <li className="hover:text-slate-900 font-semibold">
                      <a href="#">Blog</a>
                    </li>
                    <li className="hover:text-slate-900 font-semibold">
                      <a href="#">Careers</a>
                    </li>
                    <li className="hover:text-slate-900 font-semibold">
                      <a href="#">News</a>
                    </li>
                  </ul>
                </div>
                <div className="">
                  <ul className="space-y-2">
                    <li className="hover:text-slate-900 font-semibold">
                      <a href="#">Resources</a>
                    </li>
                    <li className="hover:text-slate-900 font-semibold">
                      <a href="#">Documentation</a>
                    </li>
                    <li className="hover:text-slate-900 font-semibold">
                      <a href="#">Papers</a>
                    </li>
                    <li className="hover:text-slate-900 font-semibold">
                      <a href="#">Press Conferences</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>




          </div>

          <div className="end-footer flex justify-between">
            <div className="copyright">
              <span>UK00004099186 </span>
              <span>
                © {new Date().getFullYear()} PredictIfsports.
              </span>
            </div>
            <div>
              <ul className="space-x-4 flex lg:pr-16">
                <li className="hover:text-slate-900 font-semibold">
                  <a href="#">Terms of Service</a>
                </li>
                <li className="hover:text-slate-900 font-semibold">
                  <a href="#">Privacy Policy</a>
                </li>
                <li className="hover:text-slate-900 font-semibold">
                  <a href="#">Cookies</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
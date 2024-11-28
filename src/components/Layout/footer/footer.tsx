export default function Footer() {
  return (
    <>
      <footer className="w-full py-14 px-5 text-center sm:text-left text-white bg-dark">
        <div className="container mx-auto">
          <div className="flex flex-wrap pb-11 mb-11">
            <div className="w-full lg:w-1/2 pb-5">
              <h1 className="text-4xl font-bold">
                Ready to transform your business?
              </h1>
              <h1 className="text-4xl font-bold pb-3">
                Take the first step today.
              </h1>
              <p>
                Totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et
                quasi architecto beatae vitae dicta sunt.
              </p>
            </div>
            <div className="w-full lg:w-1/2 pb-5 flex flex-col justify-end">
              <div className="flex flex-col sm:flex-row sm:space-x-36 mt-auto pl-0 sm:pl-16">
                <div className="mb-4 sm:mb-0">
                  <p>Call us</p>
                  <a href="tel:+434243" className="text-blue-600">
                    +62 (385) 5025004
                  </a>
                </div>
                <div>
                  <p>Email us</p>
                  <a href="mailto:fd" className="text-blue-600">
                    contact@domain.com
                  </a>
                </div>
              </div>
            </div>
          </div>
          <hr className="border-white" />
          <div className="flex flex-wrap mb-11 py-11">
            <div className="w-full sm:w-1/2 lg:w-1/5 mb-5 sm:mb-0">
              <h1 className="font-bold text-lg">Quick links</h1>
              <ul>
                <li className="hover:text-slate-900">
                  <a href="#">Home</a>
                </li>
                <li className="hover:text-slate-900">
                  <a href="#">About Us</a>
                </li>
                <li className="hover:text-slate-900">
                  <a href="#">Features</a>
                </li>
                <li className="hover:text-slate-900">
                  <a href="#">Solution</a>
                </li>
                <li className="hover:text-slate-900">
                  <a href="#">Pricing</a>
                </li>
              </ul>
            </div>
            <div className="w-full sm:w-1/2 lg:w-1/5 mb-5 sm:mb-0">
              <h1 className="font-bold text-lg">Services</h1>
              <ul>
                <li className="hover:text-slate-900">
                  <a href="#">Commerce</a>
                </li>
                <li className="hover:text-slate-900">
                  <a href="#">Payment</a>
                </li>
                <li className="hover:text-slate-900">
                  <a href="#">Point of Sale</a>
                </li>
                <li className="hover:text-slate-900">
                  <a href="#">Business</a>
                </li>
                <li className="hover:text-slate-900">
                  <a href="#">Customer Service </a>
                </li>
                <li className="hover:text-slate-900">
                  <a href="#">Customer Directory</a>
                </li>
              </ul>
            </div>
            <div className="w-full sm:w-1/2 lg:w-1/5 mb-5 sm:mb-0">
              <h1 className="font-bold text-lg">Resource</h1>
              <ul>
                <li className="hover:text-slate-900">
                  <a href="#">Blog</a>
                </li>
                <li className="hover:text-slate-900">
                  <a href="#">Support</a>
                </li>
                <li className="hover:text-slate-900">
                  <a href="#">Help Center</a>
                </li>
                <li className="hover:text-slate-900">
                  <a href="#">Business</a>
                </li>
                <li className="hover:text-slate-900">
                  <a href="#">Tutorials</a>
                </li>
              </ul>
            </div>
            <div className="w-full sm:w-1/2 lg:w-1/5 mb-5 sm:mb-0">
              <h1 className="font-bold text-lg">Social</h1>
              <ul>
                <li className="hover:text-slate-900">
                  <a href="#">Facebook</a>
                </li>
                <li className="hover:text-slate-900">
                  <a href="#">Twitter</a>
                </li>
                <li className="hover:text-slate-900">
                  <a href="#">Instagram</a>
                </li>
                <li className="hover:text-slate-900">
                  <a href="#">LinkedIn</a>
                </li>
              </ul>
            </div>
            <div className="w-full sm:w-1/2 lg:w-1/5 mb-5 sm:mb-0">
              <h1 className="font-bold text-lg">Legal</h1>
              <ul>
                <li className="hover:text-slate-900">
                  <a href="#">Term</a>
                </li>
                <li className="hover:text-slate-900">
                  <a href="#">Privacy</a>
                </li>
                <li className="hover:text-slate-900">
                  <a href="#">Cookies</a>
                </li>
                <li className="hover:text-slate-900">
                  <a href="#">LinkedIn</a>
                </li>
              </ul>
            </div>
          </div>

          <div className="end-footer flex justify-center items-center text-center">
            <div className="copyright">
              <span>
                Copyright © 2024 PredictIfsports. All rights reserved.
              </span>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
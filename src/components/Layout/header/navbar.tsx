import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NavbarLinks from "@/components/Ui/navbarLinks";
import ToggleBtn from "@/components/Ui/toggleButton";
import { useSelector } from "react-redux";
import { RootState } from "@/context/store/rootReducer";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon, CogIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import { Fragment } from "react";
import { user } from "../../../../public";
import { MdDashboard } from "react-icons/md";

export default function Navbar() {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const handleToggle = () => {
    setNavbarOpen(!navbarOpen);
  };

  const userdata = useSelector((state: RootState) => state.auth?.user);
  const username = userdata?.username;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10); // Trigger the scroll effect
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <header
        className={`fixed ${scrolled ? "lg:top-0" : "lg:top-6"
          } lg:left-1/2 lg:transform lg:-translate-x-1/2 w-full z-10 bg-white shadow-md px-4 max-w-screen-xl mx-auto rounded-xl transition-all duration-300`}
      >
        <nav className="container mx-auto flex justify-between items-center p-4">
          <div className="flex items-center">
            <Link to="/">
              <img
                src="assets/images/logo.png"
                alt="navbar logo"
                className="h-10"
              />
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-16">
            <NavbarLinks />
            {username ? (
              <Menu as={"div"} className={"relative inline-block text-left"}>
                <Menu.Button
                  className={
                    "inline-flex w-full justify-center items-center gap-1"
                  }
                >
                  <img
                    src={user}
                    alt={"User"}
                    width={32}
                    height={32}
                    className={
                      "rounded-full mr-1 border-2 border-white shadow-sm"
                    }
                  />
                  <span className="hidden md:block font-medium text-gray-700">
                    {username}
                  </span>
                  <ChevronDownIcon className={"w-4 h-4 text-gray-700"} />
                </Menu.Button>

                <Transition
                  as={Fragment}
                  enter={"transition ease-out duration-100"}
                  enterFrom={"transform scale-95 opacity-0"}
                  enterTo={"transform scale-100 opacity-100"}
                  leave={"transition ease-in duration-75"}
                  leaveFrom={"transform scale-100 opacity-100"}
                  leaveTo={"transform scale-95 opacity-0"}
                >
                  <Menu.Items
                    className={
                      "absolute right-0 z-50 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg"
                    }
                  >
                    <div className="p-1">
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            to={"/dashboard"}
                            className={`flex items-center gap-2 rounded p-2 transition-colors ease-in-out duration-150 text-gray-700 hover:bg-gray-100 ${active ? "bg-blue-100 font-bold" : ""
                              }`}
                          >
                            <MdDashboard className={"h-4 w-4"} />
                            <span>Dashboard</span>
                          </Link>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            to={"/profile"}
                            className={`flex items-center gap-2 rounded p-2 transition-colors ease-in-out duration-150 text-gray-700 hover:bg-gray-100 ${active ? "bg-blue-100 font-bold" : ""
                              }`}
                          >
                            <UserCircleIcon className={"h-4 w-4"} />
                            <span>Profile</span>
                          </Link>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            to={"/settings"}
                            className={`flex items-center gap-2 rounded p-2 transition-colors ease-in-out duration-150 text-gray-700 hover:bg-gray-100 ${active ? "bg-blue-100 font-bold" : ""
                              }`}
                          >
                            <CogIcon className={"h-4 w-4"} />
                            <span>Settings</span>
                          </Link>
                        )}
                      </Menu.Item>
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
            ) : (
              <Link to="/auth/signin">
                <button className="bg-black-500 text-white rounded px-8 py-2">
                  Login
                </button>
              </Link>
            )}
          </div>
          <div className="md:hidden">
            <ToggleBtn navbarOpen={navbarOpen} handleToggle={handleToggle} />
          </div>
        </nav>
        {/* Sidebar */}
        <div
          className={`fixed inset-0 z-40 bg-black bg-opacity-50 transition-opacity md:hidden ${navbarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          onClick={handleToggle}
        ></div>
        <div
          className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-md transform transition-transform md:hidden ${navbarOpen ? "translate-x-0" : "-translate-x-full"
            }`}
        >
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between px-4 py-4 border-b">
              <Link to="/">
                <img src="assets/images/logo.png" alt="Logo" className="h-10" />
              </Link>
            </div>
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
              <NavbarLinks />
            </div>
            {username ? (
              <div className="px-4 py-4 border-t">
                <Menu as="div" className="relative">
                  <Menu.Button className="flex items-center w-full text-left">
                    <img
                      src={user}
                      alt="User"
                      width={32}
                      height={32}
                      className="rounded-full mr-3 border-2 border-gray-300"
                    />
                    <span className="font-medium text-gray-700">
                      {username}
                    </span>
                    <ChevronDownIcon className="w-4 h-4 ml-auto text-gray-500" />
                  </Menu.Button>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform scale-95 opacity-0"
                    enterTo="transform scale-100 opacity-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform scale-100 opacity-100"
                    leaveTo="transform scale-95 opacity-0"
                  >
                    <Menu.Items className="absolute left-0 mt-2 w-full bg-white rounded-md shadow-lg">
                      <div className="py-1">
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              to="/dashboard"
                              className={`block px-4 py-2 text-gray-700 hover:bg-gray-100 ${active ? "bg-blue-500 text-white rounded" : ""
                                }`}
                            >
                              Dashboard
                            </Link>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              to="/profile"
                              className={`block px-4 py-2 text-gray-700 hover:bg-gray-100 ${active ? "bg-blue-500 text-white rounded" : ""
                                }`}
                            >
                              Profile
                            </Link>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              to="/settings"
                              className={`block px-4 py-2 text-gray-700 hover:bg-gray-100 ${active ? "bg-blue-500 text-white rounded" : ""
                                }`}
                            >
                              Settings
                            </Link>
                          )}
                        </Menu.Item>
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            ) : (
              <div className="px-4 py-4 border-t">
                <Link to="/auth/signin">
                  <button className="bg-black-500 text-white w-full rounded px-8 py-2">
                    Login
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </header>
    </>
  );
}
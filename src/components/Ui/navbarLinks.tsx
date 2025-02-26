import { NavLink } from "react-router-dom";
import { useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";

const links = [
  {
    title: "Sports",
    url: "/sports",},
  { title: "News",
     url: "/experts",
     dropdown:[
    { title: "The boot Room", url: "/home" },
    { title: "Strategic Analysis", url: "/home2" },
  ] },
  { title: "Scores", url: "/" },
  { title: "Forum", url: "/strategies" },
  { title: "Head2Head", url: "/head" },
  { title: "Fantasy League", url: "/fantasy" },
];

export default function NavbarLinks() {
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);

  const toggleDropdown = (index: number) => {
    setOpenDropdown(openDropdown === index ? null : index);
  };

  return (
    <>
      {/* Desktop Links */}
      <div className="hidden md:flex space-x-4">
        {links.map((link, index) =>
          link.dropdown ? (
            <div className="relative" key={index}>
              <div className="flex items-center">
                <NavLink
                  to={link.url}
                  className={({ isActive }) =>
                    `px-4 py-2  font-bold text-black ${
                      isActive ? "text-blue-500" : ""
                    }`
                  }
                >
                  {link.title}
                </NavLink>
                <button
                  onClick={() => toggleDropdown(index)}
                  className="ml-1 text-gray-700 hover:text-blue-500"
                >
                  <ChevronDownIcon className="w-4 h-4" />
                </button>
              </div>
              {openDropdown === index && (
                <div className="absolute top-full mt-2 bg-white border border-gray-200 rounded-md shadow-lg">
                  <ul className="py-1">
                    {link.dropdown.map((sublink, subIndex) => (
                      <li key={subIndex}>
                        <NavLink
                          to={sublink.url}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-100 rounded"
                        >
                          {sublink.title}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <NavLink
              key={index}
              to={link.url}
              className={({ isActive }) =>
                `px-4 py-2  font-bold text-black ${
                  isActive ? "text-blue-500" : ""
                }`
              }
            >
              {link.title}
            </NavLink>
          )
        )}
      </div>

      {/* Mobile Links */}
      <div className="md:hidden space-y-2">
        {links.map((link, index) => (
          <div key={index} className="relative">
            <div className="flex items-center justify-between pb-6">
              <NavLink
                to={link.url}
                className={({ isActive }) =>
                  `block font-bold px-4 py-2 text-xl ${
                    isActive
                      ? "bg-blue-700 text-white rounded-lg w-full "
                      : "text-gray-700"
                  }`
                }
              >
                {link.title}
              </NavLink>
              {link.dropdown && (
                <button
                  onClick={() => toggleDropdown(index)}
                  className="text-gray-700 hover:text-blue-500"
                >
                  <ChevronDownIcon className="w-5 h-5" />
                </button>
              )}
            </div>
            {link.dropdown && openDropdown === index && (
              <div className="mt-2 bg-white border border-gray-200 rounded-md shadow-lg">
                <ul className="py-1">
                  {link.dropdown.map((sublink, subIndex) => (
                    <li key={subIndex}>
                      <NavLink
                        to={sublink.url}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-100"
                      >
                        {sublink.title}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
}
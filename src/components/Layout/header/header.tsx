import { Dispatch, Fragment, SetStateAction, useEffect, useState } from "react";
import {
  CheckIcon,
  ChevronDownIcon,
  CogIcon,
  CreditCardIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import { Menu, Popover, Transition } from "@headlessui/react";
import { BellIcon } from "@heroicons/react/24/outline";
import { CgProfile } from "react-icons/cg";
import { Link } from "react-router-dom";
import { user } from "../../../../public";
import SearchModal from "./Tools/SearchModal";
import {
  TbSquareArrowLeftFilled,
  TbSquareArrowRightFilled,
} from "react-icons/tb";
import { useSelector } from "react-redux";
import { RootState } from "@/context/store/rootReducer";
import { VscSignOut } from "react-icons/vsc";
import useAuth from "@/hooks/useAuth";
import { toast } from "react-toastify";
import useDashBoardManagement from "@/hooks/useDashboard";

type Props = {
  showNav: boolean;
  setShowNav: Dispatch<SetStateAction<boolean>>;
};

interface Notification {
  id: number;
  heading: string;
  sub_heading: string;
  sub_description: string;
  description: string;
  read: boolean;
}

export const Header = ({ showNav, setShowNav }: Props) => {
  const userdata = useSelector((state: RootState) => state.auth?.user);
  const username = userdata?.username;
  const { Logout } = useAuth();
  const { getNewsEvent } = useDashBoardManagement();

  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await getNewsEvent(); // Fetch all events
        const EventResponse = response[0]
        setNotifications(EventResponse);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch notifications:", error);
        setLoading(false);
      }
    };

    fetchNotifications();
  }, [getNewsEvent]);

  const handleLogout = async () => {
    toast.promise(
      Logout(),
      {
        pending: "Logging out...",
        success: {
          render({ data }) {
            return <div>{data as string}</div>;
          },
        },
      }
    );
  };

  const markAsRead = (id: number) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <section
      className={`fixed z-[9999] w-full h-24 bg-white flex items-center transition-all duration-[900ms] ${
        showNav ? "pl-[20%]" : "md:pl-20"
      }`}
    >
      <ul
        className={
          "flex justify-between w-full items-center flex-1 px-4 md:pr-12"
        }
      >
        <div className="flex items-center justify-center gap-5">
          {showNav ? (
            <button
              className="h-8 w-8 cursor-pointer text-gray-700 hover:text-orange-500 transition-colors ease-in-out duration-[900ms]"
              onClick={() => setShowNav((prev) => !prev)}
            >
              <TbSquareArrowLeftFilled size={24} />
            </button>
          ) : (
            <button
              className="h-8 w-8 cursor-pointer text-gray-700 hover:text-orange-500 transition-colors ease-in-out duration-[900ms]"
              onClick={() => setShowNav((prev) => !prev)}
            >
              <TbSquareArrowRightFilled size={24} />
            </button>
          )}
          <div className="hidden font-bold text-4xl">Dashboard</div>
        </div>

        <div className=" ">
          <SearchModal />
        </div>
        <li className="flex items-center gap-5 md:gap-8">
          <Popover className={"relative"}>
            <Popover.Button
              className={"outline-none cursor-pointer text-gray-700"}
            >
              <BellIcon className={"h-6 w-6"} />
              {unreadCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
                  {unreadCount}
                </span>
              )}
            </Popover.Button>
            <Transition
              as={Fragment}
              enter={"transition ease-out duration-100"}
              enterFrom={"transform scale-95"}
              enterTo={"transform scale-100"}
              leave={"transition ease-in duration-75"}
              leaveFrom={"transform scale-100"}
              leaveTo={"transform scale-95"}
            >
              <Popover.Panel
                className={
                  "absolute -right-16 sm:right-0 z-50 mt-2 bg-white shadow-sm rounded max-w-xs sm:max-w-sm w-screen p-4 h-24 overflow-y-auto"
                }
              >
                <div className="flex justify-between items-center">
                  <p className="text-gray-700 font-bold">Notifications</p>
                  <button
                    className="text-sm font-medium text-orange-500 bg-transparent py-1 px-2 border border-orange-500 rounded shadow transition-colors ease-in-out duration-300 hover:bg-orange-100"
                    onClick={() =>
                      setNotifications((prev) =>
                        prev.map((notification) => ({
                          ...notification,
                          read: true,
                        }))
                      )
                    }
                  >
                    Mark all as read
                  </button>
                </div>
                <ul className="flex flex-col gap-4 mt-4 h-20 ">
                  {loading ? (
                    <p className="text-gray-500">Loading notifications...</p>
                  ) : (
                    notifications.map((notification) => (
                      <li
                        key={notification.id}
                        className="flex items-center gap-4 cursor-pointer"
                        onClick={() => markAsRead(notification.id)}
                      >
                        <Link
                          to={`/user/events/${notification.id}`}
                          className="flex items-center gap-4"
                        >
                          <div
                            className={`rounded-full shrink-0 h-8 w-8 flex items-center justify-center ${
                              notification.read
                                ? "bg-gray-200"
                                : "bg-green-200"
                            }`}
                          >
                            {notification.read ? (
                              <XMarkIcon className={"h-4 w-4 text-gray-600"} />
                            ) : (
                              <CheckIcon className={"h-4 w-4 text-green-600"} />
                            )}
                          </div>

                          <div className={"flex flex-col"}>
                            <p className="font-medium text-gray-700">
                              {notification.heading}
                            </p>
                            <p className="text-sm text-gray-500 truncate">
                              {notification.sub_heading}
                            </p>
                          </div>
                        </Link>
                      </li>
                    ))
                  )}
                </ul>
              </Popover.Panel>
            </Transition>
          </Popover>
          <Menu as={"div"} className={"relative inline-block text-left"}>
            <Menu.Button
              className={"inline-flex w-full justify-center items-center gap-1"}
            >
              <img
                src={user}
                alt={"User"}
                width={32}
                height={32}
                className={"rounded-full mr-1 border-2 border-white shadow-sm"}
              />
              <span className="hidden md:block font-medium text-gray-700">
                {username}
              </span>
              <ChevronDownIcon className={"w-4 h-4 text-gray-700"} />
            </Menu.Button>

            <Transition
              as={Fragment}
              enter={"transition ease-out duration-100"}
              enterFrom={"transform scale-95"}
              enterTo={"transform scale-100"}
              leave={"transition ease-in duration-75"}
              leaveFrom={"transform scale-100"}
              leaveTo={"transform scale-95"}
            >
              <Menu.Items
                className={
                  "absolute right-0 z-50 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg"
                }
              >
                <div className="p-1">
                  <Menu.Item>
                    <Link
                      to={"/user/profile"}
                      className={
                        "flex items-center gap-2 rounded p-2 transition-colors ease-in-out duration-150 text-gray-700 hover:bg-gray-100 group"
                      }
                    >
                      <CgProfile className={"h-4 w-4 text-gray-700"} />
                      <span className={"group-hover:text-orange-500"}>
                        View profile
                      </span>
                    </Link>
                  </Menu.Item>
                  <Menu.Item>
                    <Link
                      to={"/credit"}
                      className={
                        "flex items-center gap-2 rounded p-2 transition-colors ease-in-out duration-150 text-gray-700 hover:bg-gray-100 group"
                      }
                    >
                      <CreditCardIcon className={"h-4 w-4 text-gray-700"} />
                      <span className={"group-hover:text-orange-500"}>
                        Credit card
                      </span>
                    </Link>
                  </Menu.Item>
                  <Menu.Item>
                    <Link
                      to={"/user/strategies"}
                      className={
                        "flex items-center gap-2 rounded p-2 transition-colors ease-in-out duration-150 text-gray-700 hover:bg-gray-100 group"
                      }
                    >
                      <CogIcon className={"h-4 w-4 text-gray-700"} />
                      <span className={"group-hover:text-orange-500"}>
                        Strategies
                      </span>
                    </Link>
                  </Menu.Item>
                  <Menu.Item>
                    <Link
                      to={"/auth/change-passwordmail"}
                      className={
                        "flex items-center gap-2 rounded p-2 transition-colors ease-in-out duration-150 text-gray-700 hover:bg-gray-100 group"
                      }
                    >
                      <CogIcon className={"h-4 w-4 text-gray-700"} />
                      <span className={"group-hover:text-orange-500"}>
                        Change Password
                      </span>
                    </Link>
                  </Menu.Item>
                  <Menu.Item>
                    <button
                      onClick={() => {
                        handleLogout();
                        console.log("User logged out");
                      }}
                      className={
                        "flex items-center gap-2 rounded p-2 transition-colors ease-in-out duration-150 text-gray-700 hover:bg-gray-100 group"
                      }
                    >
                      <VscSignOut className={"h-4 w-4 text-gray-700"} />
                      <span className={"group-hover:text-orange-500"}>
                        Logout
                      </span>
                    </button>
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        </li>
      </ul>
    </section>
  );
};
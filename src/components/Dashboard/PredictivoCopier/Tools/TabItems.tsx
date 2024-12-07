import React from 'react';
import { Tabs } from 'flowbite-react';
import { customTheme } from './TabCustomTheme';
import { IoCompass } from "react-icons/io5";
import { LiaTrophySolid } from "react-icons/lia";
import { HiRectangleGroup } from "react-icons/hi2";
import { CubeIcon } from "@heroicons/react/24/solid";
import { TabItem } from './TabItem';

const tabsData = [
  {
    title: "Profile",
    icon: CubeIcon,
    content: "Profile tab's associated content",
    active: true,
  },
  {
    title: "Dashboard",
    icon: HiRectangleGroup,
    content: "Dashboard tab's associated content",
  },
  {
    title: "Settings",
    icon: IoCompass,
    content: "Settings tab's associated content",
  },
  {
    title: "Contacts",
    icon: LiaTrophySolid,
    content: "Contacts tab's associated content",
  },
];

const TabsContainer: React.FC = () => {
  return (
    <Tabs aria-label="Pills" variant="pills" theme={customTheme}>
      {tabsData.map((tab, index) => (
        <TabItem
          key={index}
          active={tab.active}
          title={tab.title}
          icon={tab.icon}
          content={
            <span className="font-medium text-gray-800 dark:text-white">
              {tab.content}
            </span>
          }
        />
      ))}
    </Tabs>
  );
};

export default TabsContainer;
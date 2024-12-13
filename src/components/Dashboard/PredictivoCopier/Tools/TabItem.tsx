import { Tabs } from "flowbite-react";

interface TabItemProps {
  active?: boolean;
  title: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  content: React.ReactNode;
}

export const TabItem: React.FC<TabItemProps> = ({ active, title, icon: Icon, content }) => {
  return (
    <Tabs.Item active={active} title={title} icon={Icon}>
      {content}
    </Tabs.Item>
  );
};
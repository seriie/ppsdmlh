interface SidebarProps {
  name: string;
  icon: React.ReactNode;
}

export default function TabList({ name, icon }: SidebarProps) {
  return (
    <div className="flex items-center gap-2 p-2 rounded-lg hover:bg-[#84AE92] cursor-pointer transition-colors">
      <span className="text-3xl">{icon}</span>
      <span className="text-base">{name}</span>
    </div>
  );
}

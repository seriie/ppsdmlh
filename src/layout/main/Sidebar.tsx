interface SidebarProps {
  title: string;
  lists: React.ReactNode;
  footer: React.ReactNode;
}

export default function AppSideBar({ title, lists, footer }: SidebarProps) {

  return (
    <aside className="fixed top-4 left-4 bottom-4 w-60 bg-white rounded-2xl shadow-xl p-4 flex flex-col justify-between border border-slate-200 transition-all duration-300 z-50">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-slate-800 tracking-tight">{title}</h1>
        <button type="button" className="p-2 rounded-lg hover:bg-slate-100 transition">
        </button>
      </div>

      <nav className="flex-1 space-y-2 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-300">
        {lists}
      </nav>

      <div className="pt-4 border-t border-slate-200">
        {footer}
      </div>
    </aside>
  );
}

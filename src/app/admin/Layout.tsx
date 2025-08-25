export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#B9D4AA]">
      <div className="mx-auto p-6">
        {children}
      </div>
    </div>
  );
}
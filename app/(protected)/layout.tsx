import { Navbar } from "./_components/navbar";

interface SettingsLayoutProps {
  children: React.ReactNode;
}

const SettingsLayout = ({ children }: SettingsLayoutProps) => {
  return (
    <div className="h-full w-full flex flex-col gap-y-15 items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-500 to-indigo-900">
      <Navbar />
      {children}
    </div>
  );
};

export default SettingsLayout;

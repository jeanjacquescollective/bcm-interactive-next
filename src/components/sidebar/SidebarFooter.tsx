import Image from "next/image";
// components/sidebar/SidebarFooter.tsx
const SidebarFooter = () => (
  <div className="flex flex-col items-center mt-4 text-gray-500 text-xs text-center space-y-1 py-2">
    <span>© 2025 Zjaak | Inspired by Canvanizer</span>
    <span>All data is stored locally in your browser</span>
    <div className="flex justify-center items-center mt-4 space-x-4">
      <div className="relative w-20 h-8">
        <Image src="/images/HAVEN_logo_bol.png" alt="Logo 1" fill style={{ objectFit: "contain" }} />
      </div>
      <div className="relative w-24 h-8">
        <Image src="/images/logo_vlaanderen.png" alt="Logo 2" fill style={{ objectFit: "contain" }} />
      </div>
    </div>
  </div>
);

export default SidebarFooter;

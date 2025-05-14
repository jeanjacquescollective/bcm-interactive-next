import BusinessModelCanvas from '@/components/BusinessModelCanvas';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import SideBarButton from '@/components/SideBarButton';

export const metadata = {
  title: 'Business Model Canvas',
  description: 'Interactive Business Model Canvas with guided questions',
};

export default function Home() {
  return (
    <div>
      <Header />

      <main className="container mx-auto px-4">
        <BusinessModelCanvas />
      </main>
      <Sidebar />
      <SideBarButton />
      
      <Footer />
    </div>
  );
}
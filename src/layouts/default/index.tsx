import { Outlet } from 'react-router-dom';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageContainer from "@/components/page-container";


const DefaultLayout: React.FC = () => {
  return (
    <>
      <Header />
      <PageContainer>
        <Outlet />
      </PageContainer>
      <Footer />
    </>
  );
};

export default DefaultLayout;

import { Outlet } from "react-router-dom";
import Header from "~/src/components/header";
import Footer from "~/src/components/footer";
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

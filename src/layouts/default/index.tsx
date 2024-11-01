import { Outlet } from "react-router-dom";
import Header from "~/src/components/header";
import Footer from "~/src/components/footer";
import PageContainer from "@/components/page-container";
import DataTest from  "@/components/data-test/DataTest";

const DefaultLayout: React.FC = () => {
  return (
    <>
      <DataTest/>
      <Header />
      <PageContainer>
        <Outlet />
      </PageContainer>     
      <Footer />

    </>
  );
};

export default DefaultLayout;

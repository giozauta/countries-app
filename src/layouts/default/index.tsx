import { Outlet } from "react-router-dom";
import Header from "~/src/components/header";
import Footer from "~/src/components/footer";
import PageContainer from "@/components/page-container";
import Otp from "~/src/components/otp";

const DefaultLayout: React.FC = () => {
  return (
    <>
      <Header />
      <PageContainer>
        <Outlet />
      </PageContainer>
      <Otp/>
      <Footer />

    </>
  );
};

export default DefaultLayout;

// layout
import Header from "./Header";
import Footer from "./Footer";
import { Toaster } from "react-hot-toast";

const Layout = ({ children }) => {

  return (
    <div className="flex flex-col min-h-screen">
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: "#1F2937",
            color: "#F3F4F6",
          },
          success: {
            iconTheme: {
              primary: "#10B981",
              secondary: "#F3F4F6",
            },
          },
          error: {
            iconTheme: {
              primary: "#EF4444",
              secondary: "#F3F4F6",
            },
          },
        }}
      />
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;

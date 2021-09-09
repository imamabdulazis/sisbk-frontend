import { useRoutes } from "react-router";
import ThemeConfig from "./theme";
import ScrollToTop from "./components/ScrollToTop";
import routes from "./routes";
import { Toaster } from "react-hot-toast";

function App() {
  const routing = useRoutes(
    routes(localStorage.getItem("token") ? true : false)
  );

  return (
    <ThemeConfig>
      <ScrollToTop />
      {routing}
      <Toaster />
    </ThemeConfig>
  );
}

export default App;

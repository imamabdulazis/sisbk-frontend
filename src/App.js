import { useRoutes } from "react-router";
import ThemeConfig from "./theme";
import ScrollToTop from "./components/ScrollToTop";
import routes from "./routes";
import { Toaster } from "react-hot-toast";
import { userSelector } from "./state/user/userSlice";
import { useSelector } from "react-redux";

function App() {
  const { user } = useSelector(userSelector);
  const routing = useRoutes(
    routes(
      localStorage.getItem("token") ? true : false,
      localStorage.getItem("role") === "Guru" ? true : false
    )
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

import Router from './routes';
import ThemeConfig from "./theme";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
    <ThemeConfig>
      <ScrollToTop />
      <Router />
    </ThemeConfig>
  );
}

export default App;

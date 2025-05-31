import {AppProvider} from "./context/AppContext.jsx";
import Router from "./routes/Router.jsx";

function App() {
  return (
    <AppProvider>
      <Router />
    </AppProvider>
  );
}

export default App;
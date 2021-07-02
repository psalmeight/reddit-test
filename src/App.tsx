import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { SnowWrapContext } from "./context/SnowWrapContext";
import Main from "./pages/Main";
import View from "./pages/View";
import { r } from "./utils/config";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <SnowWrapContext.Provider value={r}>
        <Router>
          <Switch>
            <Route exact path="/">
              <Main />
            </Route>
            <Route path="/view/:id">
              <View />
            </Route>
          </Switch>
        </Router>
      </SnowWrapContext.Provider>
    </QueryClientProvider>
  );
}

export default App;

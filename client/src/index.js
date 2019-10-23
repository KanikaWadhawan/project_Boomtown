import React from "react";
import ReactDOM from "react-dom";
import { MuiThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

import { ApolloProvider } from "react-apollo";
import ItemPreviewProvider from "./context/ItemPreviewProvider";

import registerServiceWorker from "./registerServiceWorker";
import theme from "./theme";
import client from "./apollo";

import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./routes";
import ViewerProvider from "./context/ViewerProvider";

import "./index.css";

const App = () => {
  return (
    <ApolloProvider client={client}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <ViewerProvider>
          <ItemPreviewProvider>
            <Router>
              <Routes></Routes>
            </Router>
          </ItemPreviewProvider>
        </ViewerProvider>
      </MuiThemeProvider>
    </ApolloProvider>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
registerServiceWorker();

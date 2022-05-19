import React, { lazy } from "react";
import "./App.scss";
import ThemeProvider from "./provider/theme/theme.provider";

const AnimatedRoutes = lazy(() => import("./routes/animated-routes.component"));

const App = () => {
  return (
    <div className="App h-full">
      <ThemeProvider>
        <AnimatedRoutes />
      </ThemeProvider>
    </div>
  );
};

export default App;

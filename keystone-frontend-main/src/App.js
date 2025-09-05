import "./App.css";
import AppRoutes from "./routes/AppRoutes";
import { BrowserRouter as Router } from "react-router-dom";
import { Footer, Navbar } from "./components/global";
import { useState } from "react";
import GlobalScrollAnimation from "./components/molecules/GlobalAnimation";
import CookieAlert from "./components/global/CookieAlert";

function App() {
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading time
  setTimeout(() => {
    setIsLoading(false);
  }, 2000);

  return (
    <div className="App">
      {isLoading ? (
        <div className="flex items-center justify-center h-screen bg-black">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-yellow-400 mx-auto"></div>
            <p className="text-white mt-4 text-xl">Loading...</p>
          </div>
        </div>
      ) : (
        <>
          <Router>
            <GlobalScrollAnimation />
            <div className="min-h-screen flex flex-col">
              <Navbar />
              <AppRoutes className="flex-grow" />
              <div className="mt-auto">
                <Footer />
              </div>
            </div>
            <CookieAlert />
          </Router>
        </>
      )}
    </div>
  );
}

export default App;
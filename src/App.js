import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import EventsComponent from "./components/eventsComponent/eventsComponent";
import FooterComponent from "./components/footerComponent/footerComponent";
import NavbarComponent from "./components/navbarComponent/navbarComponent";
import HomeComponent from "./components/homeComponent/homeComponent";
import AboutComponent from "./components/aboutComponent/aboutComponent";
import SupportComponent from "./components/supportComponent/supportComponent";
import "bootstrap/dist/css/bootstrap.min.css";
import { LanguageProvider } from "./components/language-context/language-contextComponent";

function App() {
  return (
    <LanguageProvider>
      <Router>
        <div className="App">
          <header className="App-header">
            <NavbarComponent />
          </header>
          <main className="App-main">
            <Routes>
              <Route path="/" Component={HomeComponent} />
              <Route path="/events" Component={EventsComponent} />
              <Route path="/about" Component={AboutComponent} />
              <Route path="/support" Component={SupportComponent} />
            </Routes>
          </main>
          <FooterComponent />
        </div>
      </Router>
    </LanguageProvider>
  );
}

export default App;

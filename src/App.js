import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import EventsComponent from "./components/eventsComponent/eventsComponent";
import FooterComponent from "./components/footerComponent/footerComponent";
import NavbarComponent from "./components/navbarComponent/navbarComponent";
import HomeComponent from "./components/homeComponent/homeComponent";
import AboutComponent from "./components/aboutComponent/aboutComponent";
import SupportComponent from "./components/supportComponent/supportComponent";
import NotFoundComponent from "./components/notFoundComponent/notFoundComponent";
import ElevenElevenComponent from "./components/elevenElevenComponent/elevenElevenComponent";
import DecorComponent from "./components/decorComponent/decorComponent";
import { LanguageProvider } from "./components/language-context/language-contextComponent";

function App() {
  return (
    <LanguageProvider>
      <Router>
        <div className="App">
          <DecorComponent />
          <ElevenElevenComponent />
          <header className="App-header">
            <NavbarComponent />
          </header>
          <main className="App-main">
            <Routes>
              <Route path="/" Component={HomeComponent} />
              <Route path="/events" Component={EventsComponent} />
              <Route path="/about" Component={AboutComponent} />
              <Route path="/support" Component={SupportComponent} />
              <Route path="*" Component={NotFoundComponent} />
            </Routes>
          </main>
          <FooterComponent />
        </div>
      </Router>
    </LanguageProvider>
  );
}

export default App;

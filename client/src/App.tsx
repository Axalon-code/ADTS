import { Switch, Route } from "wouter";
import Home from "@/pages/Home";
import Blog from "@/pages/Blog";
import BlogPost from "@/pages/BlogPost";
import Booking from "@/pages/Booking";
import Glossary from "@/pages/Glossary";
import NotFound from "@/pages/not-found";
import ScrollToTop from "@/components/ScrollToTop";

function App() {
  return (
    <>
      <ScrollToTop />
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/blog" component={Blog} />
        <Route path="/blog/:slug" component={BlogPost} />
        <Route path="/booking" component={Booking} />
        <Route path="/glossary" component={Glossary} />
        <Route component={NotFound} />
      </Switch>
    </>
  );
}

export default App;

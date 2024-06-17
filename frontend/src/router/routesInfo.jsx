import About from "../containers/home/About";
import Home from "../containers/home/Home";
import Signup from "../containers/signup";

const routes = [
  {
    id: 'signup',
    route: 'signup',
    component: <Signup />
  },
  {
    id: 'login',
    route: 'login',
    component: <Signup isLogin={true} />
  },
  {
    id: 'home',
    route: 'home',
    component: <Home />
  },
  {
    id: 'about',
    route: 'about',
    component: <About />
  },
];

export default routes;

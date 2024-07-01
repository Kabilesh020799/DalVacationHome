import About from "../containers/home/About";
import Home from "../containers/home/Home";
import Signup from "../containers/signup";
import Tickets from "../containers/tickets"
const routes = [
  {
    id: 'signup',
    route: 'signup',
    component: <Signup />
  },
  {
    id: 'tickets',
    route: '/tickets',
    component: <Tickets />
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

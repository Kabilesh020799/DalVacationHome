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
    component: <Tickets />,
  },
];

export default routes;

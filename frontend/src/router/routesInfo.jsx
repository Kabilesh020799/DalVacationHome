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
];

export default routes;

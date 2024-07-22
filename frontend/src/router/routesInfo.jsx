import About from "../containers/home/About";
import Home from "../containers/home/Home";
import Signup from "../containers/authentication/signup/Signup";
import SecurityQuestions from "../containers/authentication/signup/SecurityQuestions";
import SecurityAnswers from "../containers/authentication/login/SecurityAnswers";
import Login from "../containers/authentication/login/Login";

import Tickets from "../containers/tickets"
import Feedback from "../containers/feedback"
const routes = [
  {
    id: 'signup',
    route: 'signup',
    component: <Signup />
  },
  {
    id: 'login',
    route: 'login',
    component: <Login />
  },
  {
    id: 'home',
    route: 'home',
    component: <Home />
  },
  {
    id: 'securityquestions',
    route: 'securityquestions',
    component: <SecurityQuestions />
  },
  {
    id: 'securityanswers',
    route: 'securityanswers',
    component: <SecurityAnswers />
  },
  {
    id: 'about',
    route: 'about',
    component: <About />
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
  {
    id: 'feedback',
    route: '/feedback',
    component: <Feedback />
  },
];

export default routes;

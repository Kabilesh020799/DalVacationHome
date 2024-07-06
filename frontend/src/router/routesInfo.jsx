import About from "../containers/home/About";
import Home from "../containers/home/Home";
// import LoginPage from "../containers/login/login";
import Signup from "../containers/signup";
import SecurityQuestions from "../containers/securityQuestion/SecurityQuestions";

const routes = [
  {
    id: 'signup',
    route: 'signup',
    component: <Signup />
  },
  {
    id: 'login',
    route: 'login',
    component: <Signup isLogin = {true}/>
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
    id: 'about',
    route: 'about',
    component: <About />
  },
];

export default routes;

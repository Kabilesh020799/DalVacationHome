import About from "../containers/home/About";
import Home from "../containers/home/Home";
import Signup from "../containers/authentication/signup/Signup";
import SecurityQuestions from "../containers/authentication/signup/SecurityQuestions";
import SecurityAnswers from "../containers/authentication/login/SecurityAnswers";
import Login from "../containers/authentication/login/Login";
import LookerStudioChart from "../components/lookerstudio/LookerStudioChart";

import Tickets from "../containers/tickets"
import Feedback from "../containers/feedback"
import RoomDetail from "../containers/room-detail";
import MyBookings from "../containers/my-bookings";
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
    id: 'about',
    route: 'about',
    component: <About />
  },
  {
    id: 'feedback',
    route: '/feedback',
    component: <Feedback />
  },
  {
    id: 'room',
    route: '/room',
    component: <RoomDetail />
  },
  {
    id: 'statistics',
    route: '/statistics',
    component: <LookerStudioChart />
  },
  {
    id: 'my-bookings',
    route: '/my-bookings',
    component: <MyBookings />,
  }
];

export default routes;

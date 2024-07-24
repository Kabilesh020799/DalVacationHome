import axios from "axios";
import { ApiGateway } from "../../commonUtils";

const getBookings = async(params) => {
  const res = await axios.post(`${ApiGateway}/get-user-bookings`, { ...params }, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return JSON.parse(res.data.body);
};

export {
  getBookings,
};

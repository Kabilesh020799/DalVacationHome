import axios from "axios";
import { ApiGateway } from "../../commonUtils";

const authToken = localStorage.getItem("authToken");

const getBookings = async(params) => {
  const res = await axios.post(`${ApiGateway}/get-user-bookings`, { ...params }, {
    headers: {
      'Content-Type': 'application/json',
      "Authorization": `Bearer ${authToken}`,
    },
  });
  return JSON.parse(res.data.body);
};

const postFeedback = async(params) => {
  const url = 'https://sgegq6ro6b.execute-api.us-east-1.amazonaws.com/prod/addFeedback';
  await axios.post(url, { ...params }, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

export {
  getBookings,
  postFeedback,
};

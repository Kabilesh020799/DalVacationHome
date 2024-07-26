import axios from "axios";
import { ApiGateway } from "../../commonUtils";

const authToken = localStorage.getItem("authToken")

const confirmBooking = async(params) => {
  const res = await axios.post(`${ApiGateway}/confirm-booking`, {Records: [{ body: JSON.stringify(params) }]}, {
    headers: {
      'Content-Type': 'application/json',
      "Authorization": `Bearer ${authToken}`,
    },
  });
  console.log(res);
};

const getFeedbacks = async(params) => {
  const url = 'https://sgegq6ro6b.execute-api.us-east-1.amazonaws.com/prod/getFeedbackWithSentiment';
  const res = await axios.post(url, { ...params }, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return res;
}

export {
  confirmBooking,
  getFeedbacks,
};

import axios from "axios";
import { ApiGateway } from "../../commonUtils";

const confirmBooking = async(params) => {
  const res = await axios.post(`${ApiGateway}/confirm-booking`, {Records: [{ body: JSON.stringify(params) }]}, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  console.log(res);
};

export {
  confirmBooking,
};

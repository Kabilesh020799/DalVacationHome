import axios from "axios";
import { ApiGateway } from "../../../commonUtils";

const sendMessage = async(params) => {
  return await axios.post(`${ApiGateway}/send-message`, { ...params }, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export {
  sendMessage,
};


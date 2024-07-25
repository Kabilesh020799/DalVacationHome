import axios from "axios";
import { ApiGateway } from "../../../commonUtils";

const subscribeSNS = async(params) => {
  await axios.post(`${ApiGateway}/subscribe-sns`, { ...params }, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export {
  subscribeSNS,
};


import axios from "axios";
import { ApiGateway } from "../../../commonUtils";

const subscribeSNS = async(params) => {
  const res = await axios.post(`${ApiGateway}/subscribe-sns`, { ...params }, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  console.log(res);

};

export {
  subscribeSNS,
};


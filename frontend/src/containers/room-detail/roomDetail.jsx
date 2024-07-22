import React from "react";
import { useLocation, useSearchParams } from "react-router-dom";

const RoomDetail = () => {
  const searchParams = useSearchParams();

  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };

  const query = useQuery();
  const roomId = query.get('roomId');
console.log(roomId);
  return (
    <div>

    </div>
  );
};

export default RoomDetail;

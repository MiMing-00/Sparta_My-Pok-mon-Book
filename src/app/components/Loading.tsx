"use client";

import { ClimbingBoxLoader } from "react-spinners";

const Loading = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center absolute top-0 left-0">
      <div className="flex flex-col items-center">
        <ClimbingBoxLoader color="#ff0022" speedMultiplier={1} />
        <p className="m-5 absoulte mx-auto">포켓몬아 안녕~!</p>
      </div>
    </div>
  );
};

export default Loading;

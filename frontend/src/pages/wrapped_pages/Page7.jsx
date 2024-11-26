import React from "react";
import StoryProgressBar from "../../components/StoryProgressBar";
import { useResult } from "../../App";

const Page7 = () => {
  const { result } = useResult();

  return (
    <>
      <StoryProgressBar />
      <div style={{ textAlign: "center" }}>
        <h1>Page 7</h1>
        <img
          src="/images/stat7.jpg"
          alt="Statistics 7"
          style={{ width: "80%" }}
        />
        <p>This is the third page of statistics.</p>
      </div>
    </>
  );
};

export default Page7;

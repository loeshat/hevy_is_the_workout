import React from "react";
import StoryProgressBar from "../../components/StoryProgressBar";
import { useResult } from "../../App";

const Page6 = () => {
  const { result } = useResult();

  return (
    <>
      <StoryProgressBar />
      <div style={{ textAlign: "center" }}>
        <h1>Page 6</h1>
        <img
          src="/images/stat6.jpg"
          alt="Statistics 6"
          style={{ width: "80%" }}
        />
        <p>This is the third page of statistics.</p>
      </div>
    </>
  );
};

export default Page6;

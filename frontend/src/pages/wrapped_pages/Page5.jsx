import React from "react";
import StoryProgressBar from "../../components/StoryProgressBar";
import { useResult } from "../../App";

const Page5 = () => {
  const { result } = useResult();

  return (
    <>
      <StoryProgressBar />
      <div style={{ textAlign: "center" }}>
        <h1>Page 5</h1>
        <img
          src="/images/stat5.jpg"
          alt="Statistics 5"
          style={{ width: "80%" }}
        />
        <p>This is the third page of statistics.</p>
      </div>
    </>
  );
};

export default Page5;

import React from "react";
import StoryProgressBar from "../../components/StoryProgressBar";
import { useResult } from "../../App";

const Page4 = () => {
  const { result } = useResult();

  return (
    <>
      <StoryProgressBar />
      <div style={{ textAlign: "center" }}>
        <h1>Page 4</h1>
        <img
          src="/images/stat4.jpg"
          alt="Statistics 4"
          style={{ width: "80%" }}
        />
        <p>This is the third page of statistics.</p>
      </div>
    </>
  );
};

export default Page4;

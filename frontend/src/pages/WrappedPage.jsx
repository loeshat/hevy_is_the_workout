import React, { Suspense, lazy, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const WrappedPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [PageComponent, setPageComponent] = useState(null);

  useEffect(() => {
    const loadPage = async () => {
      try {
        const pageModule = await import(`./wrapped_pages/Page${id}`);
        setPageComponent(() =>
          React.lazy(() => Promise.resolve({ default: pageModule.default }))
        );
      } catch {
        const notFoundModule = await import("./wrapped_pages/PageNotFound");
        setPageComponent(() =>
          React.lazy(() => Promise.resolve({ default: notFoundModule.default }))
        );
      }
    };
    loadPage();
  }, [id]);

  const handleNavigation = (event) => {
    const screenWidth = window.innerWidth;
    const nextPage = parseInt(id, 10) + 1;
    const prevPage = parseInt(id, 10) - 1;

    // If click is on the left side, go back; if on the right side, go forward
    if (event.clientX < screenWidth / 2 && id !== "1") {
      navigate(`/wrapped/${prevPage}`);
    } else if (event.clientX >= screenWidth / 2) {
      navigate(`/wrapped/${nextPage}`);
    }
  };

  return (
    <div onClick={handleNavigation} style={{ width: "100vw", height: "100vh" }}>
      <Suspense fallback={<div>Loading...</div>}>
        {PageComponent ? <PageComponent /> : <div>Loading...</div>}
      </Suspense>
    </div>
  );
};

export default WrappedPage;

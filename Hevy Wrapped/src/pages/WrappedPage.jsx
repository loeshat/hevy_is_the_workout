import React, { Suspense, lazy, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import StoryProgressBar from "../components/StoryProgressBar";

const WrappedPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [PageComponent, setPageComponent] = useState(null);
  const [direction, setDirection] = useState(1); // 1 for forward, -1 for backward

  // Define background colors for each page
  const backgroundColors = {
    1: "pink",
    2: "pink",
    3: "yellow",
    4: "yellow",
    5: "blue",
    6: "blue",
    7: "teal",
    8: "green",
  };

  const currentBackgroundColor = `var(--${backgroundColors[id]})`;

  const pages = {
    1: () => import("./wrapped_pages/Page1"),
    2: () => import("./wrapped_pages/Page2"),
    3: () => import("./wrapped_pages/Page3"),
    4: () => import("./wrapped_pages/Page4"),
    5: () => import("./wrapped_pages/Page5"),
    6: () => import("./wrapped_pages/Page6"),
    7: () => import("./wrapped_pages/Page7"),
    8: () => import("./wrapped_pages/Page8"),
  };

  useEffect(() => {
    const loadPage = async () => {
      try {
        const pageModule = await (pages[id]
          ? pages[id]()
          : import("./wrapped_pages/PageNotFound"));
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

    if (event.clientX < screenWidth / 2 && id !== "1") {
      setDirection(-1); // Navigate backward
      navigate(`/wrapped/${prevPage}`);
    } else if (event.clientX >= screenWidth / 2 && id !== "8") {
      setDirection(1); // Navigate forward
      navigate(`/wrapped/${nextPage}`);
    }
  };

  const pageVariants = {
    initial: (direction) => ({ opacity: 0, x: direction > 0 ? 100 : -100 }),
    animate: { opacity: 1, x: 0 },
    exit: (direction) => ({ opacity: 0, x: direction > 0 ? -100 : 100 }),
  };

  return (
    <div
      onClick={handleNavigation}
      style={{
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        backgroundColor: currentBackgroundColor,
      }}
    >
      <StoryProgressBar />
      <Suspense fallback={<div>Loading...</div>}>
        <AnimatePresence mode="wait" custom={direction}>
          {PageComponent && (
            <motion.div
              key={id}
              custom={direction}
              initial="initial"
              animate="animate"
              exit="exit"
              variants={pageVariants}
              transition={{ duration: 0.5 }}
              style={{
                position: "absolute",
                width: "100%",
                height: "100%",
              }}
            >
              <PageComponent />
            </motion.div>
          )}
        </AnimatePresence>
      </Suspense>
    </div>
  );
};

export default WrappedPage;

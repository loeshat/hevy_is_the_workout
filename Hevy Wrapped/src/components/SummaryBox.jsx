import { Box, Typography } from "@mui/material";
import { useResult } from "../App";

const SummaryBox = () => {
  const { result } = useResult();

  // Access top 5 exercises by directly iterating over the array
  const topWorkouts = result.top_five_exercises.map((exercise) =>
    exercise.exerciseTitle
      .replace(/\s*\(.*?\)/g, "")
      .replace(/\s*-\s*.*$/, "")
      .trim()
  );

  // Access the top 3 favorite workout days
  const faveDay = Object.entries(result.workouts_per_day_of_the_week)
    .sort(([, workoutsA], [, workoutsB]) => workoutsB - workoutsA)
    .map(([day, workouts]) => ({ day, workouts }))
    .slice(0, 3);

  return (
    <>
      <Box
        sx={{
          position: "absolute",
          backgroundSize: "contain",
          zIndex: -1,
        }}
      >
        <img
          src="/assets/dumbbell_blue.png"
          style={{
            width: "80vw",
            maxWidth: "400px",
            transform: "rotate(-25deg)",
          }}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <img src="/assets/dumbbell_green.png" width="50px" />
        <Typography variant="h6" sx={{ fontWeight: "bold", fontSize: "1rem" }}>
          HEVY WRAPPED
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          width: "90%",
          gap: "5px",
          marginTop: 2,
        }}
      >
        <img src="/assets/summary_1.png" width="26%" />
        <img src="/assets/summary_2_real.png" width="18%" />
        <img src="/assets/summary_3_real.png" width="24%" />
        <img src="/assets/summary_4_real.png" width="15%" />
      </Box>

      {/* Bottom Text, data */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "left",
          textAlign: "left",
          width: "100%",
          gap: "20%",
          mt: 3,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "column",
            minWidth: "40%",
          }}
        >
          <Box>
            <Typography
              variant="h6"
              sx={{ fontWeight: "bold", fontSize: "0.8rem" }}
            >
              TOP EXERCISES
            </Typography>
            {topWorkouts.map((workout, index) => (
              <Typography
                key={index}
                variant="body1"
                sx={{
                  fontSize: "0.8rem",
                  color: "white",
                  lineHeight: "1rem",
                }}
              >
                {workout}
              </Typography>
            ))}
          </Box>
          <Box>
            <Typography
              variant="h6"
              sx={{ fontWeight: "bold", fontSize: "0.8rem" }}
            >
              WORKOUTS
            </Typography>
            <Typography
              variant="body1"
              sx={{ fontSize: "1rem", color: "white" }}
            >
              {result.total_workouts}
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "column",
            gap: "5px",
            minWidth: "40%",
          }}
        >
          <Box>
            <Typography
              variant="h6"
              sx={{ fontWeight: "bold", fontSize: "0.8rem" }}
            >
              FAVE DAYS
            </Typography>
            {faveDay.map((item, index) => (
              <Typography
                key={index}
                variant="body1"
                sx={{
                  fontSize: "0.8rem",
                  color: "white",
                  lineHeight: "1rem",
                }}
              >
                {item.day} ({item.workouts})
              </Typography>
            ))}
          </Box>
          <Box>
            <Typography
              variant="h6"
              sx={{ fontWeight: "bold", fontSize: "0.8rem" }}
            >
              MINUTES
            </Typography>
            <Typography
              variant="body1"
              sx={{ fontSize: "1rem", color: "white" }}
            >
              {result.total_workout_time_minutes.toLocaleString()}
            </Typography>
          </Box>
          <Box>
            <Typography
              variant="h6"
              sx={{ fontWeight: "bold", fontSize: "0.8rem" }}
            >
              VOLUME LIFTED
            </Typography>
            <Typography
              variant="body1"
              sx={{ fontSize: "1rem", color: "white" }}
            >
              {Math.round(result.total_volume_kgs).toLocaleString()} kg
            </Typography>
          </Box>
        </Box>
      </Box>
      <Typography
        sx={{
          fontStyle: "italic",
          fontSize: "0.5rem",
          color: "gray",
          opacity: "50%",
          position: "absolute",
          bottom: 0,
          right: 0,
          marginBottom: 1,
          marginRight: 1,
        }}
      >
        &copy; Leo Shi
      </Typography>
    </>
  );
};

export default SummaryBox;

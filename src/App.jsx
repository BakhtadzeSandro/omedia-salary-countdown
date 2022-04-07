import Layout from "./layout";
import { Box, Center, Text, useTheme } from "@chakra-ui/react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { format } from "date-fns";
import "@fontsource/poppins";
import { DAY_SECONDS, getComponentData, getTimeDays } from "./lib";

export default function App() {
  const theme = useTheme();

  const today = new Date();
  let salaryDay = 15;
  if (today.getDate() > 15 && today.getDate() <= 22) {
    salaryDay = 22;
  }

  const { duration, nextSalary, remainingTime } = getComponentData(salaryDay);

  if (remainingTime === 0) {
    return (
      <Layout>
        <Center height="60vh" textAlign={"center"}>
          <Text fontFamily={"poppins"} mt="12" fontSize={"4xl"} as="h1">
            Today is a salary day! 🎉
          </Text>
        </Center>
      </Layout>
    );
  }

  return (
    <Layout>
      <Center height="60vh">
        <Box
          bg="white"
          boxShadow="2xl"
          rounded="lg"
          w="400"
          h="400"
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          p="4"
        >
          <CountdownCircleTimer
            updateInterval={DAY_SECONDS}
            isPlaying="true"
            size="300"
            strokeWidth="15"
            colors={theme.colors.brand[100]}
            duration={duration}
            initialRemainingTime={remainingTime}
          >
            {({ elapsedTime, color }) => {
              const days = getTimeDays(duration - elapsedTime);
              return (
                <Text fontFamily={"poppins"} fontSize={"4xl"} style={{ color }}>
                  {days} day{days > 1 && "s"}
                </Text>
              );
            }}
          </CountdownCircleTimer>
        </Box>
      </Center>

      <Center mt="5">
        <Text fontSize={"2xl"}>
          {format(nextSalary, "MMMM do yyyy")}
        </Text>
      </Center>
    </Layout>
  );
}

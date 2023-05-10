import Layout from "./layout";
import {
  Box,
  Center,
  Text,
  Tabs,
  Tab,
  TabList,
  TabPanels,
  TabPanel,
  InputGroup,
  InputRightAddon,
  useTheme,
  NumberInput,
  NumberInputField
} from "@chakra-ui/react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { format } from "date-fns";
import { useState } from "react";
import "@fontsource/poppins";
import { calculateDiff, DAY_SECONDS, getComponentData, getTimeDays } from "./lib";

export default function App() {
  const theme = useTheme();

  const today = new Date();
  let salaryDay = 15;
  if (today.getDate() > 15 && today.getDate() <= 22) {
    salaryDay = 22;
  }

  const { duration, nextSalary, remainingTime } = getComponentData(salaryDay);
  const [salaryDiff, setSalaryDiff] = useState(0.0);
  const [currentSalary, setCurrentSalary] = useState(0.0);

  async function onSalaryChange(e) {
    const { diff, salaryInGELWithCurrentRate } = await calculateDiff(e.target.value);

    setSalaryDiff(diff);
    setCurrentSalary(salaryInGELWithCurrentRate);
  }

  return (<Layout>
      <Tabs variant="line" isFitted colorScheme="brand">
        <TabList>
          <Tab>💵 Pay Date</Tab>
          <Tab>🖩 Diff Calculator</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            {remainingTime === 0 ? <Center height="60vh" textAlign={"center"}>
              <Text fontFamily={"poppins"} mt="12" fontSize={"4xl"} as="h1">
                Today is a salary day! 🎉
              </Text>
            </Center> : <>
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
                      return (<Box fontFamily={"poppins"} style={{ color }} textAlign="center">
                          <Text fontWeight="bold" fontSize={64}>{days}</Text>
                          <Text fontSize={"4xl"}>day{days > 1 && "s"}</Text>
                        </Box>);
                    }}
                  </CountdownCircleTimer>
                </Box>
              </Center>

              <Box mt="5" textAlign={"center"}>
                <Text fontSize={"xl"}>Next pay date is:</Text>

                <Text fontWeight="bold" fontSize={"2xl"}>
                  {format(nextSalary, "EEEE, MMMM do yyyy")}
                </Text>
              </Box>
            </>}
          </TabPanel>
          <TabPanel>
            <Box mt="2">
              <Text mb="5">In <strong>05/05/2023</strong> Omedia has changed the salary calculation policy:</Text>

              <ul>
                <li>
                  Your current GEL-denominated salary will be converted to a
                  USD-denominated amount using an exchangerate of
                  <strong>2.5</strong>. For example, if your current salary is
                  3,000 GEL, it will be converted to 1,200 USD (3,000 GEL / 2.5 = 1,200 USD).
                </li>
                <li>
                  Your salary will continue to be paid in GEL, but the amount
                  will be calculated based on the exchange rate at the time of
                  each payout, ensuring that you receive the GEL equivalent of
                  your fixed USD salary.
                </li>
              </ul>

              <Text mt="5">This calculator can help you to identify your salary diff.</Text>
            </Box>

            <Center height="20vh">
              <Box
                bg="white"
                boxShadow="2xl"
                rounded="lg"
                justifyContent={"center"}
                alignItems={"center"}
                p="5"
              >
                <InputGroup>
                  <NumberInput min={1}>
                    <NumberInputField placeholder="Enter your salary" inputMode="numeric" onChange={onSalaryChange} />
                  </NumberInput>
                  <InputRightAddon children="₾" />
                </InputGroup>
              </Box>
            </Center>
            {currentSalary !== 0 ? <Box mt="5" textAlign={"center"}>
              <Text fontSize={"xl"}>You will receive by</Text>
              <Text fontWeight="bold" fontSize={"2xl"}>
                {(Math.round(Math.abs(salaryDiff) * 100) / 100).toFixed(2)}₾
              </Text>
              <Text fontSize={"xl"}>
                <strong>{salaryDiff > 0 ? "more" : "less"}</strong> salary in this month and it would be
              </Text>
              <Text fontWeight="bold" fontSize={"3xl"}>{(Math.round(currentSalary * 100) / 100).toFixed(2)}₾</Text>
              <Text fontSize={"xl"}>in total</Text>
            </Box> : <></>}
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Layout>);
}

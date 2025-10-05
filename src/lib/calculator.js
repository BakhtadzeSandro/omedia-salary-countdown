import { endOfMonth, format } from "date-fns";

const CURRENCY_API = `https://nbg.gov.ge/gw/api/ct/monetarypolicy/currencies/ka/json/?currencies=USD`;

const OMEDIAS_RATE = 2.5;

async function getCurrentRate(date) {
  const dateParam = date ? `&date=${format(date, "yyyy-MM-dd")}` : "";
  const response = await fetch(`${CURRENCY_API}${dateParam}`);
  const currencyData = await response.json();

  return currencyData[0]["currencies"][0]["rate"];
}

function getRateDate(salaryDay = 15) {
  const today = new Date();
  const currentDay = today.getDate();

  if (currentDay <= salaryDay) {
    const lastMonthLastDay = endOfMonth(
      new Date(today.getFullYear(), today.getMonth() - 1)
    );
    return lastMonthLastDay;
  }

  const currentMonthLastDay = endOfMonth(today);
  return currentMonthLastDay;
}

export async function calculateDiff(initialSalary, salaryDay = 15) {
  const rateDate = getRateDate(salaryDay);
  const currentRate = await getCurrentRate(rateDate);
  const salaryInUSDWithOmediasRate = initialSalary / OMEDIAS_RATE;
  const salaryInGELWithCurrentRate = salaryInUSDWithOmediasRate * currentRate;
  const diff = salaryInGELWithCurrentRate - initialSalary;

  return {
    diff,
    salaryInGELWithCurrentRate,
  };
}

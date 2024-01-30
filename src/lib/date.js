const DAY_SECONDS = 86400;

function fixSalaryDay(date) {
  if (date.getDay() === 6) {
    date.setDate(date.getDate() - 1);
  } else if (date.getDay() === 0) {
    date.setDate(date.getDate() - 2);
  }
}

function getLastSalaryDate(salaryDay = 15) {
  const date = new Date();

  if (date.getDate() <= salaryDay) {
    date.setMonth(date.getMonth() - 1);
  }
  date.setDate(salaryDay);
  fixSalaryDay(date);

  return date;
}

function getNextSalaryDate(salaryDay = 15) {
  const date = new Date();

  if (date.getDate() > salaryDay) {
    date.setMonth(date.getMonth() + 1, 1);
  }
  date.setDate(salaryDay);
  fixSalaryDay(date);

  return date;
}

function getComponentData(salaryDay = 15) {
  const today = new Date();
  const lastSalary = getLastSalaryDate(salaryDay);
  const nextSalary = getNextSalaryDate(salaryDay);

  const remainingTime = ((nextSalary.getTime() - today.getTime()) / 1000);
  const duration = (nextSalary.getTime() - lastSalary.getTime()) / 1000;

  return {
    duration, remainingTime, nextSalary
  };
}

const getTimeDays = (time) => (time / DAY_SECONDS) | 0;

export {
  DAY_SECONDS,
  getComponentData,
  getTimeDays
};

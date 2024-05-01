import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import GraphGroup from './GraphGroup'
import {
  Box,Select,
  chakra,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  useColorModeValue,
  Container,
  Flex,
  Button,
  Table,
  Tr,
  Th,
  Tbody,
  Td,
  Divider,
  TableContainer,
  Thead,
  useDisclosure,
  useToast,
  Heading,
} from "@chakra-ui/react";
import { useAuth } from "../ContextAPI/Authentication";
import { useBudget } from "../ContextAPI/Budget";
import {ClockLoader} from 'react-spinners'
import Visualize from './visualize'
const months = [
  { value: 0, label: "All Months" },
  { value: 1, label: "January" },
  { value: 2, label: "February" },
  { value: 3, label: "March" },
  { value: 4, label: "April" },
  { value: 5, label: "May" },
  { value: 6, label: "June" },
  { value: 7, label: "July" },
  { value: 8, label: "August" },
  { value: 9, label: "September" },
  { value: 10, label: "October" },
  { value: 11, label: "November" },
  { value: 12, label: "December" },
];
export default function Visulization() {
  let bgcolor = useColorModeValue("gray.800", "gray.500");
  const navigate = useNavigate();
  const { isLoggedin } = useAuth();
  const [selectedMonth, setSelectedMonth] = useState(0);
  const { budget, fetchInitialBudget } = useBudget();
  const [expenses, setExpenses] = useState(budget.expenses);
  const [filteredExpenses, setFilteredExpenses] = useState(budget.expenses);
  const [pageload,setPageLoad] = useState(true)
  
  const handleSelectMonth = (event) => {
    setSelectedMonth(parseInt(event.target.value));
  };
  useEffect(() => {
    const resetBudget = async () => {
      if (!isLoggedin()) {
        navigate("/login");
      }
      await fetchInitialBudget();
      setPageLoad(false);

    };
    resetBudget();
  }, [isLoggedin]);
useEffect(()=>{
      setExpenses(budget.expenses);
      setFilteredExpenses(budget.expenses);
},[budget.expenses])
  useEffect(() => {
    if (selectedMonth == 0) {
      setFilteredExpenses(expenses);
      return;
    } else {
      const filteredExpenses = expenses.filter(
        (expense) => new Date(expense.date).getMonth() + 1 === selectedMonth
      );
      setFilteredExpenses(filteredExpenses);
    }
    console.log(expenses);
  }, [selectedMonth]);

  if (
    !budget.expenses ||
    budget.expenses.length === 0 ||
    filteredExpenses.length == 0
  ) {
    return (
      <>
         <Select onChange={handleSelectMonth} value={selectedMonth}>
        {months.map((month) => (
          <option key={month.value} value={month.value}>
            {month.label}
          </option>
        ))}
      </Select>
        <Box maxW="7xl" mx={"auto"} pt={5} px={{ base: 2, sm: 12, md: 17 }}>
          <chakra.h1
            textAlign={"center"}
            fontSize={"4xl"}
            py={10}
            fontWeight={"bold"}
          >
            No Expense Found For Selected Month.
          </chakra.h1>
        </Box>
      </>
    ); // Render nothing if expenses array is empty
  }
  const totalExpenses = filteredExpenses.reduce(
    (acc, item) => acc + item.amount,
    0
  );
  // Average daily expenses
  const firstDate = new Date(filteredExpenses[0].date);
  const lastDate = new Date(filteredExpenses[filteredExpenses.length - 1].date);
  const totalDays =
    Math.ceil((lastDate - firstDate) / (1000 * 60 * 60 * 24)) + 1;
  const averageDailyExpense = Math.abs(totalExpenses / totalDays);

  // Maximum and minimum expenses
  const maxExpense = Math.max(...filteredExpenses.map((item) => item.amount));

  const weeklyExpenses = getWeeklyExpenses(filteredExpenses);
  const expenseByCategory = filteredExpenses.reduce((acc, item) => {
    acc[item.categoryName] = (acc[item.categoryName] || 0) + item.amount;
    return acc;
  }, {});

  const categories = Object.keys(expenseByCategory).map((categoryName) => {
    const totalExpense = expenseByCategory[categoryName];
    const allocatedAmount = budget.categories.find(
      (category) => category.name === categoryName
    )?.allocatedAmount;
    return {
      categoryName,
      totalExpense,
      amountLeft: allocatedAmount - totalExpense,
      allocatedAmount:allocatedAmount
    };
  });
  const mostExpensiveCategory = Object.keys(expenseByCategory).reduce((a, b) =>
    expenseByCategory[a] > expenseByCategory[b] ? a : b
  );
  // Expense distribution by category
  const totalAmount = Object.values(expenseByCategory).reduce((a, b) => a + b);
  const categoryDistribution = Object.entries(expenseByCategory).map(
    ([categoryName, amount]) => ({
      categoryName,
      amount,
      percentage: (amount / totalAmount) * 100,
    })
  );

  return (
    pageload?  <ClockLoader 
    cssOverride={{
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      zIndex: '9999',
    }} 
    color="#36d7b7" 
  />: <>
  <Visualize data={categories} piechartdata={categoryDistribution} handleSelectMonth={handleSelectMonth} selectedMonth={selectedMonth} />
      {" "}
      


   


      <Box  mx={"auto"} pt={5} px={{ base: 2, sm: 12, md: 17 }}>
      <GraphGroup categories={categories} weeklyExpenses={weeklyExpenses} extData={{totalExpenses,averageDailyExpense,mostExpensiveCategory,maxExpense}}/>
</Box>
    
    </>
  );
}

// Function to get weekly expenses
function getWeeklyExpenses(expenses) {
  const weeklyExpenses = [];
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  expenses.forEach((expense) => {
    const date = new Date(expense.date);
    const weekStart = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate() - date.getDay()
    );
    const dayIndex = date.getDay();

    // Find the week index
    const weekIndex = Math.floor(
      (date - weekStart) / (7 * 24 * 60 * 60 * 1000)
    );

    // Initialize the week if it doesn't exist
    if (!weeklyExpenses[weekIndex]) {
      weeklyExpenses[weekIndex] = days.map((day) => ({ day, amount: 0 }));
    }

    // Add the expense amount to the corresponding day
    weeklyExpenses[weekIndex][dayIndex].amount += expense.amount;
  });

  return weeklyExpenses;
}

// Get weekly expenses

import Grid from "@mui/material/Grid";
import axios from 'axios';

import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
// import Footer from "examples/Footer";
// import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";

// Data
// import reportsBarChartData from "layouts/dashboard/data/reportsBarChartData";
// import reportsLineChartData from "layouts/dashboard/data/reportsLineChartData";

// Dashboard components
// import Projects from "layouts/dashboard/components/Projects";
// import OrdersOverview from "layouts/dashboard/components/OrdersOverview";
<<<<<<< HEAD
import json1 from "../data/10qjson1.json";
// import json2 from "../data/10qjson2.json";
// import json3 from "../data/10qjson3.json";
// import json4 from "../data/10qjson4.json";
// import json5 from "../data/10qjson5.json";
=======
import json1 from "../data/10kjson1.json";

>>>>>>> 116e332df162a6cbaf9245af4f20c3a04aba92ce
import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard_t() {
  // const { Income, Revenue, Expense, Loss, Stock,NetIncome } = reportsLineChartData;
<<<<<<< HEAD
  // const arr = [json1, json2, json3, json4, json5]
  // const [file, setFile] = useState(json1);
  const [reqBody, setReqBody] = useState(json1);
  const [search, setSearchQuery] = useState(JSON.parse(localStorage.getItem("searchCom")));
  useEffect(() => {
    // let x = Math.floor(Math.random() * 5 );
    // setFile(arr[x]);
    try {
      console.log(search);
      axios(
        `http://localhost:5000/data/predict10q?companies=${search.company.Ticker}&startDate=${search.startDate}&endDate=${search.endDate}`
=======
  const [reqBody, setReqBody] = useState(json1);
  // console.log(localStorage.getItem("searchCom"));
  const [search, setSearchQuery] = useState(JSON.parse(localStorage.getItem("searchCom")));
  useEffect(() => {

    // let x = Math.floor(Math.random() * 5 );
    // setFile(arr[x]);
    // setJson1(JSON.parse(localStorage.getItem("")));
    // console.log(localStorage.searchCom);
    try {
      console.log(search);
      axios(
        `http://localhost:5000/data/predict10k?companies=${search.company.Ticker}&startDate=${search.startDate}&endDate=${search.endDate}`
>>>>>>> 116e332df162a6cbaf9245af4f20c3a04aba92ce
      ).then((res) => {
        setReqBody(res.data?.data);
        console.log(res.data?.data);
      }).catch((err) => console.log(err));
      // setTimeout(() => {
      // }, 1000);
    } catch (error) {
      console.log(error);
    }
  }, [search]);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <MDBox mt={4.5}>
          <Grid container spacing={3}>
            {" "}
<<<<<<< HEAD
            {reqBody?.result?.map((el, ind) => {
=======
            {reqBody.result?.map((el, ind) =>  {
>>>>>>> 116e332df162a6cbaf9245af4f20c3a04aba92ce
              return (
                <>
                  <Grid item xs={12} md={6} lg={4}>
                    <MDBox mb={3}>
                      <ReportsLineChart
                        color="info"
                        title={el.head}
                        chart={{
                          labels: el.time,
                          datasets: el.y,
                        }}
                      />{" "}
                    </MDBox>{" "}
                  </Grid>{" "}
                </>
              );
            })}{" "}
            {/* <Grid item xs={12} md={6} lg={4}>
                          <MDBox mb={3}>
                            <ReportsLineChart
                              color="info"
                              title={Income.head}
                              description="Last Campaign Performance"
                              date="campaign sent 2 days ago"
                              chart={Income}
                            />
                          </MDBox>
                        </Grid>
                        <Grid item xs={12} md={6} lg={4}>
                          <MDBox mb={3}>
                            <ReportsLineChart
                              color="dark"
                              title={Revenue.head}
                              description={
                                <>
                                  ( <strong> +15 % </strong>) increase in today sales.
                                </>
                              }
                              date="updated 4 min ago"
                              chart={Revenue}
                            />
                          </MDBox>
                        </Grid>
                        <Grid item xs={12} md={6} lg={4}>
                          <MDBox mb={3}>
                            <ReportsLineChart
                              color="info"
                              title={Expense.head}
                              description="Last Campaign Performance"
                              date="just updated"
                              chart={Expense}
                            />
                          </MDBox>
                        </Grid> */}{" "}
          </Grid>{" "}
        </MDBox>{" "}
      </MDBox>{" "}
    </DashboardLayout>
  );
}

export default Dashboard_t;

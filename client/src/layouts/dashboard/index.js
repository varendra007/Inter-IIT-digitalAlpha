import Grid from "@mui/material/Grid";

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
import json from "./data/10kjson1.json";

function Dashboard() {
  // const { Income, Revenue, Expense, Loss, Stock,NetIncome } = reportsLineChartData;

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="dark"
                icon="weekend"
                title="Bookings"
                count={281}
                percentage={{
                  color: "success",
                  amount: "+55%",
                  label: "than lask week",
                }}
              />{" "}
            </MDBox>{" "}
          </Grid>{" "}
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                icon="leaderboard"
                title="Today's Users"
                count="2,300"
                percentage={{
                  color: "success",
                  amount: "+3%",
                  label: "than last month",
                }}
              />{" "}
            </MDBox>{" "}
          </Grid>{" "}
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="success"
                icon="store"
                title="Revenue"
                count="34k"
                percentage={{
                  color: "success",
                  amount: "+1%",
                  label: "than yesterday",
                }}
              />{" "}
            </MDBox>{" "}
          </Grid>{" "}
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="primary"
                icon="person_add"
                title="Followers"
                count="+91"
                percentage={{
                  color: "success",
                  amount: "",
                  label: "Just updated",
                }}
              />
            </MDBox>
          </Grid>{" "}
        </Grid>{" "}
        <MDBox mt={4.5}>
          <Grid container spacing={3}>
            {json.results.map((el, ind) => {
              return (
                <>
                  <Grid item xs={12} md={6} lg={4}>
                    <MDBox mb={3}>
                      <ReportsLineChart
                        color="info"
                        title={el.head}
                        description="Last Campaign Performance"
                        date="campaign sent 2 days ago"
                        chart={{
                          labels: el.time,
                          datasets: el.y,
                        }}
                      />
                    </MDBox>
                  </Grid>
                </>
              );
            })}
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
            </Grid> */}
          </Grid>{" "}
        </MDBox>{" "}
      </MDBox>{" "}
    </DashboardLayout>
  );
}

export default Dashboard;

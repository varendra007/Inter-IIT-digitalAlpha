// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";
import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";

// Data
import authorsTableData from "layouts/tables/data/authorsTableData";
import projectsTableData from "layouts/tables/data/projectsTableData";
import json from "../dashboard/data/10kjson1.json";
function Tables() {

    return ( <DashboardLayout >
        <DashboardNavbar / >
        <MDBox pt = { 6 }
        pb = { 3 } >
        <Grid container spacing = { 6 } >
            <Grid item xs = { 12 } >
                <Card >
                    <MDBox mx = { 2 } mt = {-3 } py = { 3 } px = { 2 } variant = "gradient" bgColor = "info" borderRadius = "lg" coloredShadow = "info" >
                        <MDTypography variant = "h6" color = "white" >Pridiction</MDTypography> 
                    </MDBox> 
                </Card> 
            </Grid>
            <Grid item xs = { 6 } >
                <Card >
                    {
                        json.results.map((el, ind) => {
                            if(el.head=="Stock Value"){
                                return (
                                        <MDBox mb={3} xxl = { 50 }>
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
                                    )
                            }
                        })
                    }

                </Card> 
            </Grid> 
        </Grid> 
        </MDBox> 
        </DashboardLayout>
    );
}
//"xs", "sm", "md", "lg", "xl", "xxl", "section"
export default Tables;
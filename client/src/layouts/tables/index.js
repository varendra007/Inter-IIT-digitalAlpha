// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";

import json from "../dashboard/data/10kjson1.json";
import { useEffect, useState } from "react";
import axios from "axios";
function Tables() {
    var grwth=["Will Fall","Will remain Neutral","Will Rise"];
    var clr=["red","blue","green"];
    var ind=1-1;
    const [reqBody, setReqBody] = useState(json);
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

    return ( <DashboardLayout >
        <DashboardNavbar / >
        <MDBox pt = { 6 }
        pb = { 3 } >
        <Grid container spacing = { 6 } >
            <Grid item xs = { 12 } >
                <Card >
                    <MDBox mx = { 2 } mt = {-3 } py = { 3 } px = { 2 } variant = "gradient" bgColor = "info" borderRadius = "lg" coloredShadow = "info" >
                        <MDTypography variant = "h6" color = "white" >Prediction</MDTypography> 
                    </MDBox> 
                </Card> 
            </Grid>
            <Grid item xs = { 6 } >
                <Card >
                    {
                        reqBody.result?.map((el, ind) => {
                            if(el.head=="Stock Value"){
                                return (
                                        <MDBox mb={3}>
                                            <ReportsLineChart
                                                color="info"
                                                title={el.head}
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
        <MDBox pt = { 6 }
        pb = { 3 } >
            <h4>Market :</h4>
            <h4><font color={clr[ind]}>{grwth[ind]}</font></h4>
        </MDBox>
        </DashboardLayout>
    );
}
//"xs", "sm", "md", "lg", "xl", "xxl", "section"
export default Tables;
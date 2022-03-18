/**
=========================================================
* Material Dashboard 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/
import json from "./js2.json"

export default {
    NetIncome: {
        labels: json["Net Income"].time,
        datasets: json["Net Income"].y,
    },
    Income: {
        labels: json.Income.time,
        datasets: json.Income.y,
    },
    Revenue: {
        labels: json.Revenue.time,
        datasets: json.Revenue.y,
    },
    Expense: {
        labels: json.Expense.time,
        datasets: json.Expense.y,
    },
    Loss: {
        labels: json.Loss.time,
        datasets: json.Loss.y,
    },
    Stock: {
        labels: json.Stock.time,
        datasets: json.Stock.y,
    },
};
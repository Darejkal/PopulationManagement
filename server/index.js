const express = require("express");
const dbConnect = require("./config/dbConnect");
const app = express();
const port = 5000
const bodyParser = require("body-parser");
const authRouter=require("./route/authRoute")
// const hoKhauRouter = require("./route/hoKhauRoute")
// const listRouter=require("./route/listRoute")
const feeRouter=require("./route/feeRoute");
// const householdRouter=require("./route/householdRoute");
// const userRouter=require("./route/userRoute");
// const statisticRouter=require("./route/statisticRoute");
dbConnect();

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, PATCH, OPTIONS"
    );
    next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/auth",authRouter);
// app.use("/api/hoKhau",hoKhauRouter);
// app.use("/api/list",listRouter);
app.use("/api/fee",feeRouter);
// app.use("/api/contribution",contributionRouter);
// app.use("/api/household",householdRouter);
// app.use("/api/user",userRouter);
// app.use("/api/statistic",statisticRouter);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
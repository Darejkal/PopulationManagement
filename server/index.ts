import express, { Express, Request, Response, NextFunction } from "express";
import dbConnect from "./config/dbConnect";
import bodyParser from "body-parser";
import authRouter from "./routes/authRoute";
import listRouter from "./routes/listRoute";
import feeRouter from "./routes/feeRoute";
import contributionRouter from "./routes/contributionRoute";
import householdRouter from "./routes/householdRoute";
import canBoRouter from "./routes/userRoute";
import statisticRouter from "./routes/statisticRoute";

const app: Express = express();
const port: number = 5000;
dbConnect();

// Curb Cores Error by adding a header here
app.use((req: Request, res: Response, next: NextFunction) => {
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

// body parser configuration
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// route api
app.use("/api/auth", authRouter);
app.use("/api/list", listRouter);
app.use("/api/fees", feeRouter);
app.use("/api/contributions", contributionRouter);
app.use("/api/households", householdRouter);
app.use("/api/user", canBoRouter);
app.use("/api/statistics", statisticRouter);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});

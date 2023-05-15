import { Router } from "express";

import reportController from "./report-controller";

const reportRoter = Router();

reportRoter.get("/new", reportController.generateReport);

export default reportRoter;

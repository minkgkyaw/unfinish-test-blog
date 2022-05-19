import axios from "axios";
import https from "https";
import fs from "fs";
import path from "path";

const instant = axios.create({
  baseURL: " http://localhost:8000/api",
  headers: {
    "Contact-Type": "application/json",
  },
});

export default instant;

import axios from "axios";
import { env } from "process";
import "server-only";

export const falAxiosInstance = axios.create({
  baseURL: "https://queue.fal.run",
  headers: { Authorization: `Key ${env.FAL_KEY}` },
});

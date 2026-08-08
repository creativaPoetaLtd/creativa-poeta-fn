import { publicRequest } from "./client";
import { trackConversion } from "../analytics/analytics";

export const ApplyJob = async (data: any) => {
  const response = await publicRequest(
    {
      method: "POST",
      url: "/api/job/apply",
      data,
    },
    "Failed to submit job application."
  );
  trackConversion("job_application_submitted", "job_application");
  return response;
};

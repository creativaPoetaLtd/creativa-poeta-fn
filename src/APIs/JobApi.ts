import { publicRequest } from "./client";

export const ApplyJob = async (data: any) => {
  return publicRequest(
    {
      method: "POST",
      url: "/api/job/apply",
      data,
    },
    "Failed to submit job application."
  );
};

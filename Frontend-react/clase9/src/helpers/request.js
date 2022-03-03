import { getAccessToken, isLoggedIn } from "./auth";
import {
  companiesQuery,
  companyQuery,
  createJobMutation,
  jobQuery,
  jobsQuery,
} from "./gqlQuery";

const endpointURL = "http://localhost:9000/graphql";

const graphqlRequest = async (query, variables) => {
  const request = {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ query, variables }),
  };

  if (isLoggedIn()) {
    request.headers["authorization"] = `Bearer ${getAccessToken()}`;
  }

  const response = await fetch(endpointURL, request);
  const responseBody = await response.json();

  if (responseBody.errors) {
    const message = responseBody.errors
      .map((error) => error.message)
      .join("\n");
    throw new Error(message);
  }
  return responseBody.data;
};
////////////////////////////////////////////////////////////////////
const loadJobs = async () => {
  const { jobs } = await graphqlRequest(jobsQuery);
  return jobs;
};

const loadJob = async (id) => {
  const { job } = await graphqlRequest(jobQuery, { id });
  return job;
};

const loadCompany = async (id) => {
  const { company } = await graphqlRequest(companyQuery, { id });
  return company;
};

const loadCompanies = async () => {
  const { companies } = await graphqlRequest(companiesQuery);
  return companies;
};

const createJob = async (newJob) => {
  const { job } = await graphqlRequest(createJobMutation, { input: newJob });
  return job;
};

export { loadJobs, loadJob, loadCompany, loadCompanies, createJob };

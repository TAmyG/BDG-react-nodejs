import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
} from "apollo-boost";
import { getAccessToken, isLoggedIn } from "./auth";
import {
  companiesQuery,
  companyQuery,
  createJobMutation,
  jobQuery,
  jobsQuery,
} from "./gqlQuery";

const endpointURL = "http://localhost:9000/graphql";

const authLink = new ApolloLink((operation, forward) => {
  if (isLoggedIn()) {
    operation.setContext({
      headers: {
        authorization: `Bearer ${getAccessToken()}`,
      },
    });
  }

  return forward(operation);
});

const client = new ApolloClient({
  link: ApolloLink.from([authLink, new HttpLink({ uri: endpointURL })]),
  cache: new InMemoryCache(),
});
////////////////////////////////////////////////////////////////////
const loadJobs = async () => {
  const {
    data: { jobs },
  } = await client.query({ query: jobsQuery, fetchPolicy: "no-InMemoryCache" });
  return jobs;
};

const loadJob = async (id) => {
  const {
    data: { job },
  } = await client.query({ query: jobQuery, variables: { id } });
  return job;
};

const loadCompany = async (id) => {
  const {
    data: { company },
  } = await client.query({ query: companyQuery, variables: { id } });
  return company;
};

const loadCompanies = async () => {
  const {
    data: { companies },
  } = await client.query({
    query: companiesQuery,
    fetchPolicy: "no-InMemoryCache",
  });
  return companies;
};

const createJob = async (newJob) => {
  const {
    data: { job },
  } = await client.mutate({
    mutation: createJobMutation,
    variables: { input: newJob },
    update: (cache, { data }) => {
      //To prevent the double call of JobQuery
      cache.writeQuery({
        query: jobQuery,
        variables: { id: data.job.id },
        data,
      });
    },
  });

  return job;
};

export { loadJobs, loadJob, loadCompany, loadCompanies, createJob };

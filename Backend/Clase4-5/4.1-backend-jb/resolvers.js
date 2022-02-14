const db = require("./db");

const Query = {
  // primer parametro va el mismo objeto completo
  // segundo parametro van los args que se envian desde el cliente
  company: (root, { id }) => {
    const data = db.companies.get(id);
    console.log(data);
    return data;
  },
  job: (root, args) => db.jobs.get(args.id),
  jobs: () => db.jobs.list(),
};

const Job = {
  company: (root) => db.companies.get(root.companyId),
};

const Company = {
  jobs: (company) =>
    db.jobs.list().filter((job) => job.companyId === company.id),
};

const Mutation = {
  createJob: (root, { input }) => {
    const id = db.jobs.create({ ...input });
    return db.jobs.get(id);
  },
};

module.exports = {
  Query,
  Job,
  Company,
  Mutation,
};

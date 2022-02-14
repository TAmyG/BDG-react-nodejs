const db = require("./db");
const sequelize = require("./config/db");

const Query = {
  // primer parametro va el mismo objeto completo
  // segundo parametro van los args que se envian desde el cliente
  company: async (root, { id }) => {
    //const data = db.companies.get(id);
    const data = await sequelize.models.Company.findByPk(id, {
      raw: true,
      attributes: ["id", "name", "description"],
    });
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
  createJob: async (root, { input }) => {
    const newJob = await sequelize.models.Job.create({ ...input });
    return newJob;
  },
};

module.exports = {
  Query,
  Job,
  Company,
  Mutation,
};

const sequelize = require("./config/sequelize");

const Query = {
  // primer parametro va el mismo objeto completo
  // segundo parametro van los args que se envian desde el cliente
  company: async (root, { id }, context) => {
    //const data = db.companies.get(id);
    if (!(await checkSecurity(context))) {
      throw new Error("Unauthorized");
    }
    const data = await sequelize.models.Company.findByPk(id, {
      raw: true,
      attributes: ["id", "name", "description"],
    });
    console.log(data);
    return data;
  },
  job: async (root, args) => await sequelize.models.Job.findByPk(args.id),
  jobs: async () => await sequelize.models.Job.findAll({ raw: true }),
  companies: async () => await sequelize.models.Company.findAll({ raw: true }),
};

const Job = {
  company: async (root) =>
    await sequelize.models.Company.findByPk(root.companyId),
};

const Company = {
  jobs: async (company) =>
    await sequelize.models.Job.findAll({
      where: { companyId: company.id },
      raw: true,
    }),
};

const Mutation = {
  createJob: async (root, { input }, context) => {
    if (!(await checkSecurity(context))) {
      throw new Error("Unauthorized");
    }
    const newJob = await sequelize.models.Job.create({ ...input });
    return newJob;
  },
};

const checkSecurity = async (context) => {
  const { user } = context;
  return user && (await sequelize.models.User.findByPk(user.sub))
    ? true
    : false;
};
module.exports = {
  Query,
  Job,
  Company,
  Mutation,
};

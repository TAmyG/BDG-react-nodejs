const sequelize = require("./db");

const role = {
  name: "admin",
  description: `Rol con control absoluto de la aplicación.`,
};

const category_function = [
  {
    name: "Administracion",
  },
  {
    name: "Usuarios",
  },
];
const functionalities = [
  {
    name: "Crear expediente",
    description: `Posibilidad de crear nuevos expedientes.`,
    frontendPage: "",
    frontendComponent: "exp",
    backend: "",
    categoryFunctionId: 1,
    type: "administracion",
  },
  {
    name: "Editar expediente",
    description: `Posibilidad de editar expedientes.`,
    frontendPage: "",
    frontendComponent: "exp",
    backend: "",
    categoryFunctionId: 1,
    type: "administracion",
  },
  {
    name: "Eliminar expediente",
    description: `Posibilidad de eliminar expedientes.`,
    frontendPage: "",
    frontendComponent: "exp",
    backend: "",
    categoryFunctionId: 1,
    type: "administracion",
  },
  {
    name: "Crear Usuario",
    description: `Posibilidad de crear nuevos usuarios.`,
    frontendPage: "",
    frontendComponent: "user",
    backend: "",
    categoryFunctionId: 2,
    type: "usuarios",
  },
  {
    name: "Activar Usuario",
    description: `Posibilidad de activar usuarios.`,
    frontendPage: "",
    frontendComponent: "user",
    backend: "",
    categoryFunctionId: 2,
    type: "usuarios",
  },
  {
    name: "Desactivar Usuario",
    description: `Posibilidad de desactivar usuarios.`,
    frontendPage: "",
    frontendComponent: "user",
    backend: "",
    categoryFunctionId: 2,
    type: "usuarios",
  },
  {
    name: "Actualizar Usuario",
    description: `Posibilidad de actualizar usuarios.`,
    frontendPage: "",
    frontendComponent: "user",
    backend: "",
    categoryFunctionId: 2,
    type: "usuarios",
  },
];

const initialUser = {
  username: process.env.FIRST_USER,
  firstName: "your fisrt name.",
  lastName: "your last name",
  mail: "your mail",
  password: "admin",
  rol: process.env.FIRST_ROL,
  activated: true,
  loginAttemps: 0,
};

const populate = async (models) => {
  try {
    //User_role
    models.User.hasMany(models.User_role, { foreignKey: "id" });
    models.User_role.belongsTo(models.User, { foreignKey: "userId" });

    models.Role.hasMany(models.User_role, { foreignKey: "id" });
    models.User_role.belongsTo(models.Role, { foreignKey: "roleId" });

    //Function
    models.Category_function.hasMany(models.Function, { foreignKey: "id" });
    models.Function.belongsTo(models.Category_function, {
      foreignKey: "categoryFunctionId",
    });

    //Role_function
    models.Role.hasMany(models.Role_function, { foreignKey: "id" });
    models.Role_function.belongsTo(models.Role, { foreignKey: "roleId" });

    models.Function.hasMany(models.Role_function, { foreignKey: "id" });
    models.Role_function.belongsTo(models.Function, {
      foreignKey: "functionId",
    });

    //Field_value
    models.Field.hasMany(models.Field_value, { foreignKey: "id" });
    models.Field_value.belongsTo(models.Field, { foreignKey: "FieldId" });

    //Field_file_type

    models.Field.hasMany(models.Field_file_type, { foreignKey: "id" });
    models.Field_file_type.belongsTo(models.Field, { foreignKey: "fieldId" });

    models.File_type.hasMany(models.Field_file_type, { foreignKey: "id" });
    models.Field_file_type.belongsTo(models.File_type, {
      foreignKey: "fileTypeId",
    });

    //Field_document_type

    models.Field.hasMany(models.Field_document_type, { foreignKey: "id" });
    models.Field_document_type.belongsTo(models.Field, {
      foreignKey: "FieldId",
    });

    models.Document_type.hasMany(models.Field_document_type, {
      foreignKey: "id",
    });
    models.Field_document_type.belongsTo(models.Document_type, {
      foreignKey: "documentTypeId",
    });

    //Format
    models.Document_type.hasMany(models.Format, { foreignKey: "id" });
    models.Format.belongsTo(models.Document_type, {
      foreignKey: "documentTypeId",
    });

    //Document_type_detail
    models.Document_type.hasMany(models.Document_type_detail, {
      foreignKey: "id",
    });
    models.Document_type_detail.belongsTo(models.Document_type, {
      foreignKey: "documentTypeId",
    });

    models.Category.hasMany(models.Document_type_detail, { foreignKey: "id" });
    models.Document_type_detail.belongsTo(models.Category, {
      foreignKey: "categoryId",
    });

    //Category
    models.File_type.hasMany(models.Category, { foreignKey: "id" });
    models.Category.belongsTo(models.File_type, { foreignKey: "fileTypeId" });

    models.Category.hasMany(models.Category, { foreignKey: "id" });
    models.Category.belongsTo(models.Category, { foreignKey: "categoryId" });

    //Type_detail
    models.Folder_type.hasMany(models.Type_detail, { foreignKey: "id" });
    models.Type_detail.belongsTo(models.Folder_type, {
      foreignKey: "folderTypeId",
    });

    models.Category.hasMany(models.Type_detail, { foreignKey: "id" });
    models.Type_detail.belongsTo(models.Category, { foreignKey: "categoryId" });

    models.Document_type.hasMany(models.Type_detail, { foreignKey: "id" });
    models.Type_detail.belongsTo(models.Document_type, {
      foreignKey: "documentTypeId",
    });

    //Function_component_role

    models.Role.hasMany(models.Function_component_role, { foreignKey: "id" });
    models.Function_component_role.belongsTo(models.Role, {
      foreignKey: "roleId",
    });

    models.Document_type.hasMany(models.Function_component_role, {
      foreignKey: "id",
    });
    models.Function_component_role.belongsTo(models.Document_type, {
      foreignKey: "documentTypeId",
    });

    models.Container.hasMany(models.Function_component_role, {
      foreignKey: "id",
    });
    models.Function_component_role.belongsTo(models.Container, {
      foreignKey: "containerId",
    });

    models.Category.hasMany(models.Function_component_role, {
      foreignKey: "id",
    });
    models.Function_component_role.belongsTo(models.Category, {
      foreignKey: "categoryId",
    });

    models.File_type.hasMany(models.Function_component_role, {
      foreignKey: "id",
    });
    models.Function_component_role.belongsTo(models.File_type, {
      foreignKey: "fileTypeId",
    });

    models.Function_component.hasMany(models.Function_component_role, {
      foreignKey: "id",
    });
    models.Function_component_role.belongsTo(models.Function_component, {
      foreignKey: "functionComponentId",
    });

    models.Folder_type.hasMany(models.Function_component_role, {
      foreignKey: "id",
    });
    models.Function_component_role.belongsTo(models.Folder_type, {
      foreignKey: "folderTypeId",
    });

    //function_componen_rol->objec->functionObject

    models.object.hasMany(models.object, { foreignKey: "id" });
    models.object.belongsTo(models.object, { foreignKey: "objectId" });

    models.User.hasMany(models.object, { foreignKey: "id" });
    models.object.belongsTo(models.User, { foreignKey: "userId" });

    models.Branch.hasMany(models.Branch_object, { foreignKey: "id" });
    models.Branch_object.belongsTo(models.Branch, { foreignKey: "branchesId" });

    models.object.hasMany(models.Branch_object, { foreignKey: "id" });
    models.Branch_object.belongsTo(models.Branch, { foreignKey: "objectId" });

    models.Container.hasMany(models.object, { foreignKey: "id" });
    models.object.belongsTo(models.Container, { foreignKey: "containerId" });

    models.Folder_type.hasMany(models.object, { foreignKey: "id" });
    models.object.belongsTo(models.Folder_type, { foreignKey: "folderTypeId" });

    models.Category.hasMany(models.object, { foreignKey: "id" });
    models.object.belongsTo(models.Category, { foreignKey: "categoryId" });

    models.File_type.hasMany(models.object, { foreignKey: "id" });
    models.object.belongsTo(models.File_type, { foreignKey: "fileTypeId" });

    models.Document_type.hasMany(models.object, { foreignKey: "id" });
    models.object.belongsTo(models.Document_type, {
      foreignKey: "documentTypeId",
    });

    //Field_object
    models.Field.hasMany(models.Field_object, {
      foreignKey: "id",
    });
    models.Field_object.belongsTo(models.Field, {
      foreignKey: "fieldId",
    });
    //Comment
    models.User.hasMany(models.Comment, {
      foreignKey: "id",
    });
    models.Comment.belongsTo(models.User, {
      foreignKey: "userId",
    });
    models.object.hasMany(models.Comment, {
      foreignKey: "id",
    });
    models.Comment.belongsTo(models.object, {
      foreignKey: "objectId",
    });

    const check_system = await models.Check_system.findOne({
      where: {
        name: "initialDataClient",
      },
    });
    if (!check_system) {
      await models.Check_system.create({
        name: "initialDataClient",
        description: "Verification of initial data load",
        value: true,
      });
    } else {
      if (check_system.value) {
        return;
      }
      await models.Check_system.update(
        {
          value: true,
        },
        {
          where: {
            name: "initalDataClient",
          },
        }
      );
    }

    await models.Category_function.create(category_function[0]);
    await models.Category_function.create(category_function[1]);

    /*functionalities.forEach(async (funcion) => {
      await models.Function.create(funcion);
    }); */

    await models.Role.create(role);
    await models.User.create(initialUser);

    /*const functions = await models.Function.findAll();

    const roleId = await models.Role.findOne({
      where: {
        name: role.name,
      },
    });

    functions.forEach(async (f) => {
      await models.Role_function.create({
        functionId: f.id,
        roleId: roleId.id,
      });
    });
    const userAdmin = await models.User.findOne({
      where: {
        username: initialUser.username,
      },
    });

    await models.User_role.create({
      userId: userAdmin.id,
      roleId: roleId.id,
      description: '',
      name: ''
    });
    */
  } catch (error) {
    console.log("populate: ", error);
  }
};

module.exports = { populate };

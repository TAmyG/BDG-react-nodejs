const { getHeroeById } = require("./08-imp-exp");

module.exports = getHeroeByIdAsync = (id) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Tarea
      // importen el
      const p1 = getHeroeById(id);
      if (p1) {
        resolve(p1);
      } else {
        reject("No se pudo encontrar el héroe");
      }
    }, 1000);
  });
};

console.log(getHeroeByIdAsync(1));

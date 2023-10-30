const num = 8;
const randomNameGenerator = num => {
   let res = '';
   for(let i = 0; i < num; i++){
      const random = Math.floor(Math.random() * 27);
      res += String.fromCharCode(97 + random);
   };
   return res;
};
module.exports = randomNameGenerator(num)

// const num = 8;
// const randomNameGenerator = num => {
//    let res = '';
//    for(let i = 0; i < num; i++){
//       const random = Math.floor(Math.random() * 27);
//       res += String.fromCharCode(97 + random);
//    };
//    return res;
// };
// module.exports = randomNameGenerator(num)

function generateRandomName() {
   const adjectives = ["Cool", "Mysterious", "Curious", "Eager", "Brave"];
   const nouns = ["Explorer", "Wanderer", "Traveler", "Adventurer", "Seeker"];
   const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];
   const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
   return `${randomAdjective}${randomNoun}`;
}
module.exports = { generateRandomName }
const fetch = require("node-fetch");
const args = process.argv.slice(2);
let name = args[0].trim();

const getData = async () => {
  const opts = {
    headers: {
      cookie: "hasCookie=true",
    },
  };
  let result = await fetch("https://codequiz.azurewebsites.net/", opts)
  result = await result.text()
  return result;
};


const getNav = async () => {
  let result;
  let s = "";
  let txtData = await getData()
  txtData = txtData.trim()
  txtData = txtData.match(/<td[\s\S]*?<\/td>/g);
  txtData.map((val) => {
    val = val.replace("<td>", "");
    val = val.replace("</td>", "");
    s += val
    s += ','
  })
  s = s.split(',');
  let regString = `${name}`;
  let regexp = new RegExp(regString, "i");
  s.map((val , i) => {
     if(regexp.test(val)) {
      result = s[i + 1];
      return
     }
     return;
   });
  console.log(`NAV FROM ${name} is ${result}`);
}

getNav()
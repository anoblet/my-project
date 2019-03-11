export default async () => {
  const ip = await findBridge();
  const _auth = await auth(ip);
};

const findBridge = async () => {
  return await fetch("https://discovery.meethue.com/")
    .then(function(response) {
      return response.json();
    })
    .then(function(myJson) {
      return myJson[0]["internalipaddress"];
    });
};

const auth = async (ip: string) => {
  await fetch(`http://${ip}/api/newdeveloper`, {
    method: "GET",
    mode: "no-cors"
  })
    .then(function(response) {
      // const result = response ? response.json() : false;
      // return result;
    })
    .then(function(myJson) {
      return myJson;
    });
};

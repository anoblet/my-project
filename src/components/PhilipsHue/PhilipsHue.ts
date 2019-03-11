const user = "mWHCs99pkPAniHe0lsSG8ES7qG1xDF8qDQw0h0dN";

export default async () => {
  const ip = await findBridge();
  // const _auth = await auth(ip);
  isOn({ ip, user, id: 2 });
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
  return await fetch(`http://${ip}/api`, {
    // @ts-ignore
    body: JSON.stringify({ devicetype: "my_hue_app#iphone peter" }),
    method: "POST"
  }).then((response: any) => {
    if (response.body) return response.json();
  });
};

const on = async (ip: any, username: any) => {
  console.log(status);
};

const status = async ({ ip, user, id }: any) => {
  const url = `http://${ip}/api/${user}/lights/${id}`;
  return await fetch(url).then((response: any) => {
    return response.json();
  });
};

export const isOn = async (options: any) => {
  const _status = await status(options);
  return _status.state.on;
};

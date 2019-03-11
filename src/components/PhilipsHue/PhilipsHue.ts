const user = "mWHCs99pkPAniHe0lsSG8ES7qG1xDF8qDQw0h0dN";

export default async () => {
  const ip = await findBridge();
  isOn({ ip, user, id: 2 });
  const lights = listLights({ ip, user});
  console.log(lights);
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
    body: JSON.stringify({ devicetype: "my_hue_app#iphone peter" }),
    method: "POST"
  }).then((response: any) => {
    if (response.body) return response.json();
  });
};

const status = async ({ ip, user, id }: any) => {
  const url = `http://${ip}/api/${user}/lights/${id}`;
  return await fetch(url).then((response: any) => {
    return response.json();
  });
};

export const isOn = async (options: any) => {
  const lights = listLights(options);
  console.log(lights);
  const _status = await status(options);
  return _status.state.on;
};

export const turnOn = async ({ ip, id, user }: any) => {
  const body = { on: true };
  return await fetch(`http://${ip}/api/${user}/lights/${id}/state`, {
    body: JSON.stringify(body),
    method: "PUT"
  }).then((response: any) => {
    if (response.body) return response.json();
  });
};

export const listLights = async ({ ip, id, user }: any) => {
  const body = { on: true };
  return await fetch(`http://${ip}/api/${user}/lights`, {
    method: "GET"
  }).then((response: any) => {
    if (response.body) return response.json();
  });
};

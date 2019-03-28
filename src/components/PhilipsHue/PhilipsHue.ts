const devicetype = "anoblet";

/**
 * Finds a bridge
 * @return [description]
 */
export const findBridge = async () => {
  return await fetch("https://discovery.meethue.com/")
    .then(function(response) {
      return response.json();
    })
    .then(function(myJson) {
      return myJson[0].internalipaddress;
    });
};

export const auth = async (ip: string) => {
  return await fetch(`http://${ip}/api`, {
    body: JSON.stringify({ devicetype }),
    method: "POST"
  }).then((response: any) => {
    if (response.body) return response.json();
  });
};

export const status = async ({ ip, user, id }: any) => {
  const url = `http://${ip}/api/${user}/lights/${id}`;
  return await fetch(url).then((response: any) => {
    return response.json();
  });
};

export const isOn = async (options: any) => {
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

export const turnOff = async ({ ip, id, user }: any) => {
  const body = { on: false };
  return await fetch(`http://${ip}/api/${user}/lights/${id}/state`, {
    body: JSON.stringify(body),
    method: "PUT"
  }).then((response: any) => {
    if (response.body) return response.json();
  });
};

export const getLights = async ({ ip, user }: any) => {
  const body = { on: true };
  return await fetch(`http://${ip}/api/${user}/lights`, {
    method: "GET"
  }).then((response: any) => {
    if (response.body) return response.json();
  });
};

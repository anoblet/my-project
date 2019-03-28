const ip = async () => {
  return await fetch("https://discovery.meethue.com/").then(
    async (response: any) => {
      const json = await response.json();
      return json[0].internalipaddress;
    }
  );
};

export const bridge = {
  ip
};

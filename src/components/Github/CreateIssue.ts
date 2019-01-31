import { config } from "../../../config";

interface IssueRequest {
  endpoint: any;
  data: any;
}

const user = "anoblet";
const repo = "my-project";

// github
const username = config.github.username;
const password = config.github.password;

/**
 * Submit the issue to the endpoint
 * @return
 * */
export const post = ({ data }: IssueRequest) => {
  const endpoint = `https://api.github.com/repos/${user}/${repo}/issues`;
  return fetch(endpoint, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: "Basic " + btoa(`${username}:${password}`)
    },
    body: JSON.stringify(data)
  });
};

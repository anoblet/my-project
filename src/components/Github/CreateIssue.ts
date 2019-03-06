import { config } from "../../../config";

interface IssueRequest {
  data: { title: string; body: string };
}

const repo = "my-project";

// github
const username = config.github.username;
const password = config.github.password;

/**
 * Submit the issue to the endpoint
 * @return Promise
 * */
export const createIssue = ({ data }: IssueRequest) => {
  const endpoint = `https://api.github.com/repos/${username}/${repo}/issues`;
  return fetch(endpoint, {
    method: "POST",
    headers: {
      Accept: "application/json",
      // Basic auth
      Authorization: "Basic " + btoa(`${username}:${password}`)
    },
    body: JSON.stringify(data)
  });
};

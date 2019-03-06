import { config } from "../../../config";

interface IssueRequest {
  data: { title: string; body: string };
}

// github
const repo = "my-project";
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
      Authorization: "Basic " + btoa(`${username}:${password}`)
    },
    body: JSON.stringify(data)
  });
};

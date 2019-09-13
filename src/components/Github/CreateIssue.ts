import { secrets } from "../../../secrets";

interface IssueRequest {
  data: { title: string; body: string };
}

// github
const repo = "my-project";
const username = secrets.github.username;
const password = secrets.github.password;

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

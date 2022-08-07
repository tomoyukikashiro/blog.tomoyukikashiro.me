import { graphql } from "@octokit/graphql";
import {
  Issue,
  Repository,
  SearchResultItemConnection,
} from "@octokit/graphql-schema";

const TOKEN = process.env.GITHUB_TOKEN;
const repositoryName = "blog.tomoyukikashiro.me";
const ownerName = "tomoyukikashiro";

const request = graphql.defaults({
  headers: {
    authorization: `token ${TOKEN}`,
  },
});

export const getIssueByNumber = (number: number) => {
  return request<{ repository: Repository }>(
    `query getIssue($name: String!, $owner: String!, $number: Int!) {
  repository(name: $name, owner: $owner) {
    issue(number: $number) {
      body
    }
  }
}`,
    {
      name: repositoryName,
      owner: ownerName,
      number: number,
    }
  ).then((data) => data.repository.issue?.body);
};

export const getIssues = ({
  lang,
  slug,
  count,
}: {
  lang?: "en-US" | "ja-JP";
  slug?: string;
  count: number;
}) => {
  const langQuery = lang ? `"lang: ${lang}"` : "";
  const slugQuery = slug ? `"slug: ${slug}"` : "";
  return request<{ search: SearchResultItemConnection }>(
    `query getPost($q: String!, $count: Int!) {
  search(query: $q, type: ISSUE, first: $count) {
    nodes {
      ... on Issue {
        number
        title
        body
        createdAt
        updatedAt
        url
        comments(first: 50) {
          nodes {
            author {
              avatarUrl
              login
            }
            body
            createdAt
            id
            reactions(first: 50) {
              nodes {
                id
                content
              }
            }
          }
        }
        reactions(first: 50) {
          nodes {
            content
            id
          }
        }
        author {
          avatarUrl
          login
        }
      }
    }
  }
}
`,
    {
      q: `repo:${ownerName}/${repositoryName} in:body ${slugQuery} ${langQuery} author:${ownerName} is:open label:published sort:created-desc`,
      count,
    }
  ).then((data) => data.search.nodes as Issue[]);
};

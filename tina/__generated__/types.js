export function gql(strings, ...args) {
  let str = "";
  strings.forEach((string, i) => {
    str += string + (args[i] || "");
  });
  return str;
}
export const ArticlesPartsFragmentDoc = gql`
    fragment ArticlesParts on Articles {
  __typename
  slug
  titleZh
  titleEn
  date
  coverImage
  tags
  summaryZh
  summaryEn
  bodyZh
  bodyEn
  status
  type
}
    `;
export const WorksPartsFragmentDoc = gql`
    fragment WorksParts on Works {
  __typename
  slug
  titleZh
  titleEn
  date
  coverImage
  category
  descriptionZh
  descriptionEn
  detailZh
  detailEn
  images
  published
}
    `;
export const ProfilePartsFragmentDoc = gql`
    fragment ProfileParts on Profile {
  __typename
  nickname
  introZh
  introEn
  avatar
  bioZh
  bioEn
  github
  xiaohongshu
  weibo
  email
}
    `;
export const ArticlesDocument = gql`
    query articles($relativePath: String!) {
  articles(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...ArticlesParts
  }
}
    ${ArticlesPartsFragmentDoc}`;
export const ArticlesConnectionDocument = gql`
    query articlesConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: ArticlesFilter) {
  articlesConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...ArticlesParts
      }
    }
  }
}
    ${ArticlesPartsFragmentDoc}`;
export const WorksDocument = gql`
    query works($relativePath: String!) {
  works(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...WorksParts
  }
}
    ${WorksPartsFragmentDoc}`;
export const WorksConnectionDocument = gql`
    query worksConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: WorksFilter) {
  worksConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...WorksParts
      }
    }
  }
}
    ${WorksPartsFragmentDoc}`;
export const ProfileDocument = gql`
    query profile($relativePath: String!) {
  profile(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...ProfileParts
  }
}
    ${ProfilePartsFragmentDoc}`;
export const ProfileConnectionDocument = gql`
    query profileConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: ProfileFilter) {
  profileConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...ProfileParts
      }
    }
  }
}
    ${ProfilePartsFragmentDoc}`;
export function getSdk(requester) {
  return {
    articles(variables, options) {
      return requester(ArticlesDocument, variables, options);
    },
    articlesConnection(variables, options) {
      return requester(ArticlesConnectionDocument, variables, options);
    },
    works(variables, options) {
      return requester(WorksDocument, variables, options);
    },
    worksConnection(variables, options) {
      return requester(WorksConnectionDocument, variables, options);
    },
    profile(variables, options) {
      return requester(ProfileDocument, variables, options);
    },
    profileConnection(variables, options) {
      return requester(ProfileConnectionDocument, variables, options);
    }
  };
}
import { createClient } from "tinacms/dist/client";
const generateRequester = (client) => {
  const requester = async (doc, vars, options) => {
    let url = client.apiUrl;
    if (options?.branch) {
      const index = client.apiUrl.lastIndexOf("/");
      url = client.apiUrl.substring(0, index + 1) + options.branch;
    }
    const data = await client.request({
      query: doc,
      variables: vars,
      url
    }, options);
    return { data: data?.data, errors: data?.errors, query: doc, variables: vars || {} };
  };
  return requester;
};
export const ExperimentalGetTinaClient = () => getSdk(
  generateRequester(
    createClient({
      url: "https://content.tinajs.io/2.4/content/e11bd95b-4d4a-468b-97a4-4928158bd92b/github/main",
      queries
    })
  )
);
export const queries = (client) => {
  const requester = generateRequester(client);
  return getSdk(requester);
};

import { gql } from "@apollo/client";

export const LIST_COUNTRIES = gql`
  query Countries {
    countries {
      code
      continent {
        id
        name
      }
      emoji
      id
      name
    }
  }
`;

export const FIND_COUNTRY_BY_CODE = gql`
  query Country($code: String!) {
    country(code: $code) {
      code
      continent {
        id
        name
      }
      emoji
      name
      id
    }
  }
`;

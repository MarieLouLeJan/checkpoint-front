import { gql } from "@apollo/client";

export const LIST_CONTINENTS = gql`
  query Continents {
    continents {
      id
      name
    }
  }
`;

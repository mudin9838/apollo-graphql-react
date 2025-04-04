import { gql } from "@apollo/client";

export const GET_ALLToys =gql`
query{
  allToys{
    id
    name
    price
    image
  }
}
`;
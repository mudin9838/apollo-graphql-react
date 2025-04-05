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

export const GET_TOY_BY_ID = gql`
query($id: ID!) {
    Toy(id: $id) {
    id
    name
    price
    image
  }
}
`;
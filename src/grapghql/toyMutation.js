import { gql } from "@apollo/client";


export const CREATE_NEW_TOY = gql`
mutation($name: String!, $price: Float!, $image: String!) {
    createToy(name: $name, price: $price, image: $image) {
        id
        name
        price
        image
    }
}`
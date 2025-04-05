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

export const UPDATE_TOY = gql`
mutation($id: ID!, $name: String!, $price: Float!, $image: String!) {
    updateToy(id: $id, name: $name, price: $price, image: $image) {
        id
        name
        price
        image
    }
}`

export const DELETE_TOY_BY_ID = gql`
mutation($id: ID!) {
    removeToy(id: $id) {
        id
    }
}`
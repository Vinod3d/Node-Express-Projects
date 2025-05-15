import { gql } from "graphql-tag";

export const typeDefs = gql `
    type Product {
        id: ID!
        title: String!
        price: Float!
        inStock: Boolean!
    }


    type Query {
        products: [Product!]!
        product(id:ID!):Product
    }
`;
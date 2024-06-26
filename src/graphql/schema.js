import { gql } from 'graphql-tag';
import Component from '../models/Components';

export const typeDefs = gql`
  type Component {
    _id: ID!
    name: String!
    content: String!
  }

  type Query {
    components: [Component]
    component(id: ID!): Component
  }

  type Mutation {
    addComponent(name: String!, content: String!): Component
    saveComponents(components: [ComponentInput!]!): [Component]
  }

  input ComponentInput {
    name: String!
    content: String!
  }
`;

export const resolvers = {
  Query: {
    components: async () => await Component.find({}),
    component: async (_, { id }) => await Component.findById(id),
  },
  Mutation: {
    addComponent: async (_, { name, content }) => {
      const component = new Component({ name, content });
      await component.save();
      return component;
    },
    saveComponents: async (_, { components }) => {
      const savedComponents = await Component.insertMany(components);
      return savedComponents;
    },
  },
};

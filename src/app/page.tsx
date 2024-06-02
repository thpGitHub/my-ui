'use client';

import { useQuery, gql } from '@apollo/client';

const GET_COMPONENTS = gql`
  query GetComponents {
    components {
      _id
      name
      content
    }
  }
`;

const ComponentsPage = () => {
  const { loading, error, data } = useQuery(GET_COMPONENTS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>Components from API</h1>
      {data.components.map((component: any) => (
        <div key={component._id}>
          <h2>{component.name}</h2>
          <div dangerouslySetInnerHTML={{ __html: component.content }} />
        </div>
      ))}
    </div>
  );
};

export default ComponentsPage;

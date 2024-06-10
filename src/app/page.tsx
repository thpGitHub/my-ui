'use client';

import { useQuery, gql } from '@apollo/client';
import SaveComponentButton from '@/components/SaveComponentButton';

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
      <h1>BackOffice of My-UI-Doc</h1>
      {data.components.map((component: any) => (
        <div key={component._id}>
          <h2>{component.name}</h2>
          <div dangerouslySetInnerHTML={{ __html: component.content }} />
        </div>
      ))}
      <SaveComponentButton />
    </div>
  );
};

export default ComponentsPage;

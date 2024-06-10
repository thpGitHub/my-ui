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
      <SaveComponentButton />
    </div>
  );
};

export default ComponentsPage;

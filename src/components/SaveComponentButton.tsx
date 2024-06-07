import React, { useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import client from '../lib/apolloClient';

const SAVE_COMPONENTS = gql`
  mutation SaveComponents($components: [ComponentInput!]!) {
    saveComponents(components: $components) {
      _id
      name
      content
    }
  }
`;

interface ComponentInput {
  name: string;
  content: string;
}

interface ComponentResponse {
  _id: string;
  name: string;
  content: string;
}

interface SaveComponentsData {
  saveComponents: ComponentResponse[];
}

interface SaveComponentsVars {
  components: ComponentInput[];
}

const SaveComponentButton: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const [saveComponents] = useMutation<SaveComponentsData, SaveComponentsVars>(SAVE_COMPONENTS, { client });

  const handleSaveComponents = async () => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch('/api/components');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const componentFiles: ComponentInput[] = await response.json();

      const { data } = await saveComponents({ variables: { components: componentFiles } });

      if (data) {
        setSuccess('Components saved successfully!');
      }
    } catch (err: any) {
      setError(`Failed to save components: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button onClick={handleSaveComponents} disabled={loading}>
        {loading ? 'Saving...' : 'Save Components'}
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
    </div>
  );
};

export default SaveComponentButton;

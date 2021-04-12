import styled from 'styled-components';

export const PreviewList: React.FC = () => {
  return (
    <ScContainer>
      <ScHeader>Collections</ScHeader>

      <ScFilesContainer>
        <ScFile />
        <ScFile />
        <ScFile />
        <ScFile />
      </ScFilesContainer>
    </ScContainer>
  );
};

const ScContainer = styled.div`
  width: 100%;
  max-width: 100vw;
  overflow: hidden;
  margin-bottom: 16px;
`;

const ScHeader = styled.div`
  width: 100%;
  height: 52px;
  background-color: ${p => p.theme.col5};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5em;
  font-weight: bold;
  color: ${p => p.theme.col1};
  margin-bottom: 16px;
`;

const ScFilesContainer = styled.div`
  display: grid;
  /* grid-auto-columns: 100px; */
  grid-auto-flow: row;
  grid-gap: 16px;
  align-items: center;
  justify-items: center;
  padding: 0 16px;
`;

const ScFile = styled.div`
  width: 100%;
  height: 56px;
  background-color: ${p => p.theme.col5};
`;

// const ScMore = styled.div`
//   margin-left: 16px;
// `;

// const ScButton = styled(Button)`
//   background-color: ${p => p.theme.col5};
//   white-space: nowrap;
// `;

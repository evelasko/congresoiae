import { graphql, useStaticQuery } from 'gatsby';
import React from 'react';

const Downloads = () => {
  const data = useStaticQuery(graphql`
    {
      allFile(filter: { extension: { eq: "pdf" } }) {
        edges {
          node {
            publicURL
            name
          }
        }
      }
    }
  `);
  return (
    <div style={{ marginTop: '25px' }}>
      <h1>All PDF Downloads</h1>
      <ul style={{ marginTop: '25px' }}>
        {data.allFile.edges.map((file, index) => {
          return (
            <li key={`pdf-${index}`}>
              <a href={file.node.publicURL} download>
                {file.node.name}
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
export default Downloads;

// Imports from React
import React from 'react';
// Imports of components
import Main from '../components/Main';
import Section from '../components/Section';
import PageTitle from '../components/PageTitle';

const NotFoundPage = () => {
  return (
    <Main>
      <Section>
        <PageTitle title="404 Page not Found" />
      </Section>
    </Main>
  );
};

export default NotFoundPage;

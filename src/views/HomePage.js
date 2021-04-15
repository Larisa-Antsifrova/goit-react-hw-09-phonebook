// Imports from React
import React from 'react';
// Imports of components
import Main from '../components/Main';
import Section from '../components/Section';
import PageTitle from '../components/PageTitle';

const HomePage = () => {
  return (
    <Main>
      <Section>
        <PageTitle title="One App for ALL your contacts!" />
      </Section>
    </Main>
  );
};

export default HomePage;

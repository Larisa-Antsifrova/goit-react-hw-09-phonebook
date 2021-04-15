// React imports
import React from 'react';

// Components imports
import Main from '../components/Main';
import Section from '../components/Section';
import PageTitle from '../components/PageTitle';
import LoginForm from '../components/LoginForm';

const LoginPage = () => {
  return (
    <Main>
      <Section>
        <PageTitle title="Please, log in:" />
        <LoginForm />
      </Section>
    </Main>
  );
};

export default LoginPage;

// React imports
import React from 'react';

// Components imports
import Main from '../components/Main';
import Section from '../components/Section';
import PageTitle from '../components/PageTitle';
import RegisterForm from '../components/RegisterForm';

const RegisterPage = () => {
  return (
    <Main>
      <Section>
        <PageTitle title="Please, register:" />
        <RegisterForm />
      </Section>
    </Main>
  );
};

export default RegisterPage;

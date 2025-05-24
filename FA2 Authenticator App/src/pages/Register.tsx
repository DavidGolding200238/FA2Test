import React from 'react';
import AuthLayout from '../components/AuthLayout';
import RegistrationForm from '../components/RegistrationForm';

const Register: React.FC = () => {
  return (
    <AuthLayout title="Register">
      <RegistrationForm />
    </AuthLayout>
  );
};

export default Register;
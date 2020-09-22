import React from 'react';

import Stepper from '../../components/Stepper';

const Appointment: React.FC = () => {
  const steps = [
    {
      title: 'Teste 1',
      page: 'Page1',
    },
    {
      title: 'Teste 2',
      page: 'Page2',
    },
    {
      title: 'Teste 33333333333333333333',
      page: 'Page3',
    },
  ];
  return (
    <div>
      <Stepper header steps={steps} footer />
    </div>
  );
};

export default Appointment;

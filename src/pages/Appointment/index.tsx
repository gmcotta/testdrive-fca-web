import React, { useState } from 'react';

import Stepper from '../../components/Stepper';
import Identification from '../Review/Steps/Identification';
import Car from '../Review/Steps/Car';
import Comment from '../Review/Steps/Comment';

const Appointment: React.FC = () => {
  const values = {
    identification: '',
    anonymous: false,
    car: '',
    text: '',
  };

  const steps = [
    {
      title: 'Identificação',
      page: <Identification values={values} />,
    },
    {
      title: 'Carro',
      page: <Car />,
    },
    {
      title: 'Comentário',
      page: <Comment />,
    },
  ];

  const [formValues, setFormValues] = useState(values);

  return (
    <div>
      <Stepper header steps={steps} footer />
    </div>
  );
};

export default Appointment;

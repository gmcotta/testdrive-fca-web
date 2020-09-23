import React, { useCallback, useState } from 'react';

type IdentificationProps = {
  values: {
    [key: string]: string | boolean;
  };
};

const Identification: React.FC<IdentificationProps> = ({ values }) => {
  const [formValues, setFormValues] = useState(values);

  const handleChange = useCallback(
    event => {
      if (event.target.type === 'checkbox') {
        console.log(event.target.name, event.target.checked);
        setFormValues({
          ...formValues,
          [event.target.name]: event.target.checked,
        });
      } else {
        console.log(event.target.name, event.target.value);
        setFormValues({
          ...formValues,
          [event.target.name]: event.target.value,
        });
      }
    },
    [setFormValues, formValues],
  );

  return (
    <div>
      <span>Identificação</span>
      <input
        type="text"
        placeholder="identificação"
        id="identificaton"
        name="identification"
        onChange={event => handleChange(event)}
      />
      <input
        type="checkbox"
        name="anonymous"
        id="anonymous"
        onChange={event => handleChange(event)}
      />
    </div>
  );
};

export default Identification;

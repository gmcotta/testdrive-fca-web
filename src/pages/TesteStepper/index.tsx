import React, { useCallback, useEffect, useMemo, useState } from 'react';
import './styles.css';

type FormValues = {
  identification: string;
  anonymous: boolean;
  car: string;
  text: string;
};

const StepperForm = () => {
  const initialValues = {
    identification: '',
    anonymous: false,
    car: '',
    text: '',
  };
  const initialErrors = {
    identification: '',
    anonymous: '',
    car: '',
    text: '',
  };
  const initialTouched = {
    identification: false,
    anonymous: false,
    car: false,
    text: false,
  };

  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState(initialErrors);
  const [touched, setTouched] = useState(initialTouched);

  const [currentStep, setCurrentStep] = useState(2);
  const commentMaxLength = 200;

  const defineErrorMessage = useCallback((key, message) => {
    setErrors(oldErrors => ({
      ...oldErrors,
      [key]: message,
    }));
  }, []);

  useEffect(() => {
    if (!values.identification && !values.anonymous) {
      defineErrorMessage('identification', 'Necessário preencher uma opção.');
    }
    if (values.identification || values.anonymous) {
      defineErrorMessage('identification', '');
    }

    if (!values.car) {
      defineErrorMessage('car', 'Necessário escolher um carro.');
    }
    if (values.car) {
      defineErrorMessage('car', '');
    }

    if (!values.text) {
      defineErrorMessage('text', 'Necessário fazer um comentário.');
    }
    if (values.text) {
      defineErrorMessage('text', '');
    }
  }, [values, defineErrorMessage]);

  const handleChange = useCallback(
    event => {
      const fieldName = event.target.getAttribute('name');
      const fieldType = event.target.getAttribute('type');

      if (fieldType === 'checkbox') {
        const { checked } = event.target;
        setValues(oldValues => ({ ...oldValues, [fieldName]: checked }));
      } else {
        const { value } = event.target;
        setValues(oldValues => ({ ...oldValues, [fieldName]: value }));
      }
    },
    [setValues],
  );

  const handleBlur = useCallback(
    event => {
      const fieldName = event.target.getAttribute('name');
      setTouched(oldTouched => ({
        ...oldTouched,
        [fieldName]: true,
      }));
    },
    [setTouched],
  );

  const prevStep = useCallback(() => {
    setCurrentStep(oldStep => oldStep - 1);
  }, []);
  const nextStep = useCallback(() => {
    setCurrentStep(oldStep => oldStep + 1);
  }, []);

  const handleSubmit = useCallback(
    event => {
      event.preventDefault();
      switch (currentStep) {
        case 0:
          if (errors.identification || errors.anonymous) {
            setTouched(oldTouched => ({
              ...oldTouched,
              identification: true,
              anonymous: true,
            }));
          } else {
            // regra para verificar a identificação no db
            // se estiver certo, levar para a seção de comentário
            // se estiver errado, mostrar mensagem de erro
            // se for anônimo, levar para a seção de carro
            nextStep();
          }
          break;
        case 1:
          if (errors.car) {
            setTouched(oldTouched => ({
              ...oldTouched,
              car: true,
            }));
          } else {
            nextStep();
          }
          break;
        case 2:
          if (errors.text) {
            setTouched(oldTouched => ({
              ...oldTouched,
              text: true,
            }));
          } else {
            nextStep();
          }
          break;
        default:
          break;
      }
    },
    [currentStep, nextStep, errors, setTouched],
  );

  return (
    <form onSubmit={event => handleSubmit(event)}>
      <header>Formulário</header>
      <section className={`section--${currentStep === 0 ? 'active' : 'hide'}`}>
        <label htmlFor="identification">Identificação</label>
        <input
          type="text"
          name="identification"
          id="identification"
          value={values.identification}
          onChange={event => handleChange(event)}
          onBlur={event => handleBlur(event)}
          disabled={!!values.anonymous}
        />
        {touched.identification &&
          errors.identification &&
          !values.anonymous && <span>{errors.identification}</span>}

        <input
          type="checkbox"
          name="anonymous"
          id="anonymous"
          checked={values.anonymous}
          onChange={event => handleChange(event)}
          onBlur={event => handleBlur(event)}
          disabled={!!values.identification}
        />
        <label htmlFor="anonymous">Quero avaliar anonimamente</label>
      </section>
      <section className={`section--${currentStep === 1 ? 'active' : 'hide'}`}>
        <select
          name="car"
          id="car"
          value={values.car}
          onChange={event => handleChange(event)}
          onBlur={event => handleBlur(event)}
        >
          <option value="">Selecione um carro</option>
          <option value="toro">Toro</option>
          <option value="ducato">Ducato</option>
          <option value="fiorino">Fiorino</option>
          <option value="cronos">Cronos</option>
          <option value="fiat 500">Fiat 500</option>
          <option value="marea">Marea</option>
          <option value="linea">Linea</option>
          <option value="argo">Argo</option>
          <option value="renegade">Renegade</option>
        </select>
        {touched.car && errors.car && <span>{errors.car}</span>}
      </section>
      <section className={`section--${currentStep === 2 ? 'active' : 'hide'}`}>
        <label htmlFor="text">Comentário</label>
        <textarea
          name="text"
          id="text"
          cols={80}
          rows={5}
          maxLength={commentMaxLength}
          value={values.text}
          onChange={event => handleChange(event)}
          onBlur={event => handleBlur(event)}
        />
        <span>{`${values.text.length}/${commentMaxLength}`}</span>
        {touched.text && errors.text && <span>{errors.text}</span>}
      </section>
      <section className={`section--${currentStep === 3 ? 'active' : 'hide'}`}>
        <h1>Obrigado</h1>
      </section>
      <footer>
        <button
          type="button"
          onClick={() => prevStep()}
          disabled={currentStep === 0}
        >
          Voltar
        </button>
        <button type="submit">Avançar</button>
      </footer>
    </form>
  );
};

const TesteStepper: React.FC = () => {
  return (
    <div>
      <header>TesteStepper</header>
      <StepperForm />
    </div>
  );
};

export default TesteStepper;

// const schemaValidation = Yup.object().shape({
//   identification: Yup.string().when('anonymous', {
//     is: false,
//     then: Yup.string().required('Necessário preencher algum campo.'),
//   }),
//   anonymous: Yup.boolean(),
//   car: Yup.string().when(['identification', 'anonymous'], {
//     is: (identification, anonymous) => anonymous || !!identification,
//     then: Yup.string().required('Necessário selecionar um carro.'),
//   }),
// });

// schemaValidation
//   .validate({
//     identification: values.identification,
//     anonymous: values.anonymous,
//     car: values.car,
//   })
//   .then(valuesValidated => console.log(valuesValidated))
//   .catch(err => console.log(err.errors));

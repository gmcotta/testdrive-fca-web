import React, { useCallback, useEffect, useState, useMemo } from 'react';
import Lottie from 'react-lottie';

import ARGO from '../../assets/carrossel_argo.png';
import CRONOS from '../../assets/carrossel_cronos.png';
import DUCATO from '../../assets/carrossel_ducato.png';
import FIAT500 from '../../assets/carrossel_fiat500.png';
import FIORINO from '../../assets/carrossel_fiorino.png';
import LINEA from '../../assets/carrossel_linea.png';
import MAREA from '../../assets/carrossel_marea.png';
import RENEGADE from '../../assets/carrossel_renegade.png';
import TORO from '../../assets/carrossel_toro.png';

import animationData from '../../assets/animations/loading-1.json';

import Button from '../../components/Button';
import Header from '../../components/Header';
import { HeadingPrimary, ParagraphPrimary } from '../../components/Typography';
import Textarea from '../../components/Textarea';
import Input from '../../components/Input';
import Checkbox from '../../components/Checkbox';
import Carousel from '../../components/Carousel';

import { StepperForm, Step, StepperFooter, FormGroup } from './styles';

type FormValues = {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  address: string;
  addressNumber: string;
  addressComplement: string;
  neighborhood: string;
  city: string;
  uf: string;
};

const Form = () => {
  const initialValues = useMemo(
    () => ({
      firstName: '',
      lastName: '',
      phone: '',
      email: '',
      address: '',
      addressNumber: '',
      addressComplement: '',
      neighborhood: '',
      city: '',
      uf: '',
    }),
    [],
  );

  const initialErrors = useMemo(
    () => ({
      firstName: '',
      lastName: '',
      phone: '',
      email: '',
      address: '',
      addressNumber: '',
      neighborhood: '',
      city: '',
      uf: '',
    }),
    [],
  );

  const initialTouched = useMemo(
    () => ({
      firstName: false,
      lastName: false,
      phone: false,
      email: false,
      address: false,
      addressNumber: false,
      neighborhood: false,
      city: false,
      uf: false,
    }),
    [],
  );

  const recommendedCars = useMemo(
    () => [
      {
        name: 'FIAT500',
        caption: 'Fiat 500',
        photo: FIAT500,
      },
      {
        name: 'ARGO',
        caption: 'Fiat Argo',
        photo: ARGO,
      },
      {
        name: 'CRONOS',
        caption: 'Fiat Cronos',
        photo: CRONOS,
      },
      {
        name: 'DUCATO',
        caption: 'Fiat Ducato',
        photo: DUCATO,
      },
      {
        name: 'FIORINO',
        caption: 'Fiat Fiorino',
        photo: FIORINO,
      },
      {
        name: 'LINEA',
        caption: 'Fiat Linea',
        photo: LINEA,
      },
      {
        name: 'MAREA',
        caption: 'Fiat Marea',
        photo: MAREA,
      },
      {
        name: 'TORO',
        caption: 'Fiat Toro',
        photo: TORO,
      },
      {
        name: 'RENEGADE',
        caption: 'Jeep Renegade',
        photo: RENEGADE,
      },
    ],
    [],
  );

  const lottieOptions = useMemo(
    () => ({
      loop: true,
      autoplay: true,
      animationData,
      rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice',
      },
    }),
    [],
  );

  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState(initialErrors);
  const [touched, setTouched] = useState(initialTouched);
  const [currentStep, setCurrentStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const defineErrorMessage = useCallback((key, message) => {
    setErrors(oldErrors => ({
      ...oldErrors,
      [key]: message,
    }));
  }, []);

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

  const handlePhoneChange = useCallback(event => {
    const fieldName = event.target.getAttribute('name');
    let { value } = event.target;
    if (typeof value === 'string') {
      value = value
        .replace(/\D/g, '')
        .replace(/(\d{2})(\d)/, '$1 $2')
        .replace(/(\d{4})(\d)/, '$1-$2')
        .replace(/(\d{4})-(\d)(\d{4})/, '$1$2-$3')
        .replace(/(-\d{4})\d+?$/, '$1');
    }
    setValues(oldValues => ({ ...oldValues, [fieldName]: value }));
  }, []);

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

  const selectStep = useCallback(stepNumber => {
    setCurrentStep(stepNumber);
  }, []);

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
          if (
            errors.firstName ||
            errors.lastName ||
            errors.phone ||
            errors.email ||
            errors.address ||
            errors.addressNumber ||
            errors.neighborhood ||
            errors.city ||
            errors.uf
          ) {
            setTouched(oldTouched => ({
              ...oldTouched,
              firstName: true,
              lastName: true,
              phone: true,
              email: true,
              address: true,
              addressNumber: true,
              neighborhood: true,
              city: true,
              uf: true,
            }));
          } else {
            nextStep();
          }
          break;
        case 1:
          break;
        case 2:
          break;
        default:
          break;
      }
    },
    [errors, currentStep, nextStep],
  );

  const setCarouselValue = useCallback((car: string) => {
    setValues(oldValues => ({ ...oldValues, car }));
  }, []);

  // Set error messages
  useEffect(() => {
    if (!values.firstName) {
      defineErrorMessage('firstName', 'Nome obrigatório');
    }
    if (values.firstName) {
      defineErrorMessage('firstName', '');
    }

    if (!values.lastName) {
      defineErrorMessage('lastName', 'Sobrenome obrigatório');
    } else {
      defineErrorMessage('lastName', '');
    }

    if (!values.phone) {
      defineErrorMessage('phone', 'Telefone obrigatório');
    } else if (!values.phone.match(/^\d{2} \d{4,5}-\d{4}$/)) {
      defineErrorMessage('phone', 'Telefone no padrão incorreto');
    } else {
      defineErrorMessage('phone', '');
    }

    if (!values.email) {
      defineErrorMessage('email', 'E-mail obrigatório');
    } else if (
      !values.email.match(
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      )
    ) {
      defineErrorMessage('email', 'E-mail no padrão incorreto');
    } else {
      defineErrorMessage('email', '');
    }

    if (!values.address) {
      defineErrorMessage('address', 'Endereço obrigatório');
    }
    if (values.address) {
      defineErrorMessage('address', '');
    }
    if (!values.addressNumber) {
      defineErrorMessage('addressNumber', 'Número obrigatório');
    }
    if (values.addressNumber) {
      defineErrorMessage('addressNumber', '');
    }
    if (!values.neighborhood) {
      defineErrorMessage('neighborhood', 'Bairro obrigatório');
    }
    if (values.neighborhood) {
      defineErrorMessage('neighborhood', '');
    }
    if (!values.city) {
      defineErrorMessage('city', 'Cidade obrigatória');
    }
    if (values.city) {
      defineErrorMessage('city', '');
    }
    if (!values.uf) {
      defineErrorMessage('uf', 'UF obrigatório');
    } else if (!values.uf.match(/[A-Z]{2}/)) {
      defineErrorMessage('uf', 'UF inválido');
    } else {
      defineErrorMessage('uf', '');
    }
  }, [values, defineErrorMessage]);

  return (
    <StepperForm onSubmit={event => handleSubmit(event)}>
      <>
        {currentStep === 0 && (
          <Step>
            <div>
              <HeadingPrimary>Dados</HeadingPrimary>
              <ParagraphPrimary>
                Queremos te conhecer! Preencha os dados abaixo.
              </ParagraphPrimary>
            </div>
            <FormGroup>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gridColumnGap: '1.6rem',
                  marginBottom: '1.6rem',
                }}
              >
                <Input
                  id="firstName"
                  label="Nome"
                  name="firstName"
                  onChange={event => handleChange(event)}
                  onBlur={event => handleBlur(event)}
                  errorMessage={errors.firstName}
                  value={values.firstName}
                  hasError={touched.firstName && !!errors.firstName}
                />
                <Input
                  id="lastName"
                  label="Sobrenome"
                  name="lastName"
                  onChange={event => handleChange(event)}
                  onBlur={event => handleBlur(event)}
                  errorMessage={errors.lastName}
                  value={values.lastName}
                  hasError={touched.lastName && !!errors.lastName}
                />
              </div>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gridColumnGap: '1.6rem',
                  marginBottom: '1.6rem',
                }}
              >
                <Input
                  id="phone"
                  label="Telefone"
                  name="phone"
                  placeholder="__ _____-____"
                  onChange={event => handlePhoneChange(event)}
                  onBlur={event => handleBlur(event)}
                  errorMessage={errors.phone}
                  value={values.phone}
                  hasError={touched.phone && !!errors.phone}
                />
                <Input
                  id="email"
                  label="E-mail"
                  name="email"
                  placeholder="exemplo@exemplo.com"
                  onChange={event => handleChange(event)}
                  onBlur={event => handleBlur(event)}
                  errorMessage={errors.email}
                  value={values.email}
                  hasError={touched.email && !!errors.email}
                />
              </div>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 14rem 22rem',
                  gridColumnGap: '1.6rem',
                  marginBottom: '1.6rem',
                }}
              >
                <Input
                  id="address"
                  label="Endereço"
                  name="address"
                  onChange={event => handleChange(event)}
                  onBlur={event => handleBlur(event)}
                  errorMessage={errors.address}
                  value={values.address}
                  hasError={touched.address && !!errors.address}
                />
                <Input
                  id="addressNumber"
                  label="Número"
                  name="addressNumber"
                  onChange={event => handleChange(event)}
                  onBlur={event => handleBlur(event)}
                  errorMessage={errors.addressNumber}
                  value={values.addressNumber}
                  hasError={touched.addressNumber && !!errors.addressNumber}
                />
                <Input
                  id="addressComplement"
                  label="Complemento"
                  name="addressComplement"
                  onChange={event => handleChange(event)}
                  onBlur={event => handleBlur(event)}
                  value={values.addressComplement}
                  optional
                />
              </div>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr 10rem',
                  gridColumnGap: '1.6rem',
                  marginBottom: '1.6rem',
                }}
              >
                <Input
                  id="neighborhood"
                  label="Bairro"
                  name="neighborhood"
                  onChange={event => handleChange(event)}
                  onBlur={event => handleBlur(event)}
                  errorMessage={errors.neighborhood}
                  value={values.neighborhood}
                  hasError={touched.neighborhood && !!errors.neighborhood}
                />
                <Input
                  id="city"
                  label="Cidade"
                  name="city"
                  onChange={event => handleChange(event)}
                  onBlur={event => handleBlur(event)}
                  errorMessage={errors.city}
                  value={values.city}
                  hasError={touched.city && !!errors.city}
                />
                <Input
                  id="uf"
                  label="UF"
                  name="uf"
                  onChange={event => handleChange(event)}
                  onBlur={event => handleBlur(event)}
                  errorMessage={errors.uf}
                  value={values.uf}
                  hasError={touched.uf && !!errors.uf}
                />
              </div>
            </FormGroup>
          </Step>
        )}
        {currentStep === 1 && (
          <Step>
            <div>
              <HeadingPrimary>Carro</HeadingPrimary>
              <ParagraphPrimary>Qual foi o carro testado?</ParagraphPrimary>
            </div>
          </Step>
        )}
        {currentStep === 2 && (
          <Step>
            <div>
              <HeadingPrimary>Comentário</HeadingPrimary>
              <ParagraphPrimary>
                Escreva abaixo o que você achou do carro.
              </ParagraphPrimary>
            </div>
          </Step>
        )}
        {currentStep === 3 && (
          <Step>
            <div>
              <HeadingPrimary>Obrigado</HeadingPrimary>
            </div>
          </Step>
        )}
        {isLoading && (
          <div
            style={{
              zIndex: 10,
              position: 'absolute',
              top: '0',
              left: '0',
              backgroundColor: 'rgba(0, 0, 0, 0.1)',
              width: '100vw',
              height: '100vh',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Lottie
              options={lottieOptions}
              height={400}
              width={400}
              isClickToPauseDisabled
            />
          </div>
        )}
      </>

      <StepperFooter>
        <button
          type="button"
          onClick={() => prevStep()}
          disabled={currentStep === 0}
        >
          Voltar
        </button>
        <button type="submit" disabled={currentStep === 3}>
          Avançar
        </button>
      </StepperFooter>
    </StepperForm>
  );
};

const Appointment: React.FC = () => {
  return (
    <div style={{ height: '100%' }}>
      <Header description="Avaliação" />
      <Form />
    </div>
  );
};

export default Appointment;

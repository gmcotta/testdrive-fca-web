import React, { useCallback, useEffect, useState, useMemo } from 'react';
import Lottie from 'react-lottie';

import api from '../../services/api';

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

import {
  StepperFooter,
  StepperForm,
  Step,
  FormGroup,
  TextareaWrapper,
  PhotoWrapper,
} from './styles';

type FormValues = {
  identification: string;
  anonymous: boolean;
  car: string;
  text: string;
};

const Form = () => {
  const initialValues = useMemo(
    () => ({
      identification: '',
      anonymous: false,
      car: '',
      text: '',
    }),
    [],
  );

  const initialErrors = useMemo(
    () => ({
      identification: '',
      anonymous: '',
      car: '',
      text: '',
    }),
    [],
  );

  const initialTouched = useMemo(
    () => ({
      identification: false,
      anonymous: false,
      car: false,
      text: false,
    }),
    [],
  );

  const initialResult = useMemo(
    () => ({
      recommendation: '',
      entities: [],
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

  const commentMinLength = useMemo(() => 14, []);
  const commentMaxLength = useMemo(() => 200, []);

  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState(initialErrors);
  const [touched, setTouched] = useState(initialTouched);
  const [apiResults, setApiResults] = useState(initialResult);
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
    if (values.anonymous) {
      setCurrentStep(oldStep => oldStep - 1);
    } else {
      selectStep(0);
    }
  }, [values, setCurrentStep, selectStep]);

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
            // use case to check identification on db
            const dbIdentification = 'teste';
            const dbCar = 'FIORINO';

            if (values.anonymous) {
              nextStep();
              break;
            }

            if (values.identification === dbIdentification) {
              setValues(oldValues => ({
                ...oldValues,
                car: dbCar,
              }));
              selectStep(2);
              break;
            } else {
              defineErrorMessage('identification', 'Usuário não encontrado...');
            }
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
            setIsLoading(true);
            api
              .post('/api/v1/recommend', { car: values.car, text: values.text })
              .then(response => {
                const recommendationWithoutSpace = response.data.recommendation.replace(
                  ' ',
                  '',
                );
                setApiResults({
                  recommendation: recommendationWithoutSpace,
                  entities: response.data.entities,
                });
                setIsLoading(false);
                nextStep();
              });
          }
          break;
        default:
          break;
      }
    },
    [
      errors,
      values,
      currentStep,
      defineErrorMessage,
      setTouched,
      selectStep,
      nextStep,
    ],
  );

  const setCarouselValue = useCallback((car: string) => {
    setValues(oldValues => ({ ...oldValues, car }));
  }, []);

  // Set error messages
  useEffect(() => {
    if (!values.identification && !values.anonymous) {
      defineErrorMessage(
        'identification',
        'Necessário preencher seu código ou avaliar anonimamente.',
      );
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

    if (values.text.length <= commentMinLength) {
      defineErrorMessage(
        'text',
        `Comentário com mínimo de ${commentMinLength} caracteres.`,
      );
    }
    if (values.text.length > commentMinLength) {
      defineErrorMessage('text', '');
    }
  }, [values, commentMinLength, defineErrorMessage]);

  return (
    <StepperForm autoComplete="off" onSubmit={event => handleSubmit(event)}>
      <>
        {currentStep === 0 && (
          <Step>
            <div>
              <HeadingPrimary>Identificação</HeadingPrimary>
              <ParagraphPrimary>
                Digite seu código de identificação emitido no agendamento.
              </ParagraphPrimary>
              <ParagraphPrimary>
                Caso queira, também pode fazer a avaliação de maneira anônima.
              </ParagraphPrimary>
            </div>
            <FormGroup>
              <Input
                id="identification"
                label="Identificação"
                name="identification"
                onChange={event => handleChange(event)}
                onBlur={event => handleBlur(event)}
                disabled={values.anonymous}
                errorMessage={errors.identification}
                value={values.identification}
                autoComplete="off"
                hasError={
                  (touched.identification &&
                    !!errors.identification &&
                    !values.anonymous) ||
                  (touched.anonymous &&
                    !!errors.identification &&
                    !values.anonymous)
                }
              />
              <Checkbox
                id="anonymous"
                label="Quero avaliar anonimamente"
                name="anonymous"
                checked={values.anonymous}
                onChange={event => handleChange(event)}
                onBlur={event => handleBlur(event)}
                disabled={!!values.identification}
                hasError={
                  (touched.identification &&
                    !!errors.identification &&
                    !values.anonymous) ||
                  (touched.anonymous &&
                    !!errors.identification &&
                    !values.anonymous)
                }
              />
            </FormGroup>
          </Step>
        )}
        {currentStep === 1 && (
          <Step>
            <div>
              <HeadingPrimary>Carro</HeadingPrimary>
              <ParagraphPrimary>Qual foi o carro testado?</ParagraphPrimary>
            </div>
            <div
              style={{
                width: 'min(50vw, 50rem)',
                margin: '4.8rem auto 0',
              }}
            >
              <Carousel
                photos={recommendedCars.map(car => car.photo)}
                captions={recommendedCars.map(car => car.caption)}
                hasNav
                optionValues={recommendedCars.map(car => car.name)}
                setFormValue={setCarouselValue}
              />
            </div>
          </Step>
        )}
        {currentStep === 2 && (
          <Step>
            <div>
              <HeadingPrimary>Comentário</HeadingPrimary>
              <ParagraphPrimary>
                {`Escreva abaixo o que você achou do ${
                  recommendedCars.find(car => car.name === values.car)?.caption
                }.`}
              </ParagraphPrimary>
            </div>
            <TextareaWrapper>
              <Textarea
                name="text"
                id="text"
                minLength={commentMinLength}
                maxLength={commentMaxLength}
                value={values.text}
                errorMessage={errors.text}
                hasError={touched.text && !!errors.text}
                hasCounter
                onChange={event => handleChange(event)}
                onBlur={event => handleBlur(event)}
              />
            </TextareaWrapper>
          </Step>
        )}
        {currentStep === 3 && (
          <Step>
            <div>
              <HeadingPrimary>Obrigado</HeadingPrimary>

              {apiResults.recommendation && (
                <>
                  <ParagraphPrimary>
                    Que pena que você não gostou do carro :(
                  </ParagraphPrimary>
                  <ParagraphPrimary>
                    {`Caso queira realizar um novo test drive conosco,
                    sugerimos o ${
                      recommendedCars.find(
                        car => car.name === apiResults.recommendation,
                      )?.caption
                    }.`}
                  </ParagraphPrimary>
                </>
              )}

              {!apiResults.recommendation && !!apiResults.entities.length && (
                <>
                  <ParagraphPrimary>
                    Maravilha! Ficamos felizes que tenha gostado!
                  </ParagraphPrimary>
                  <ParagraphPrimary>
                    Caso tenha se identificado, entraremos em contato.
                  </ParagraphPrimary>
                </>
              )}

              {!apiResults.recommendation && !apiResults.entities.length && (
                <>
                  <ParagraphPrimary>
                    Não conseguimos processar seu comentário...
                  </ParagraphPrimary>
                  <ParagraphPrimary>
                    Por favor, tente novamente mais tarde.
                  </ParagraphPrimary>
                </>
              )}
            </div>

            {apiResults.recommendation && (
              <PhotoWrapper>
                <img
                  src={
                    recommendedCars.find(
                      car => car.name === apiResults.recommendation,
                    )?.photo
                  }
                  alt=""
                />
                <HeadingPrimary>
                  {
                    recommendedCars.find(
                      car => car.name === apiResults.recommendation,
                    )?.caption
                  }
                </HeadingPrimary>

                <Button to="/review">Agendar test drive</Button>
              </PhotoWrapper>
            )}
            {!apiResults.recommendation && !!apiResults.entities.length && (
              <PhotoWrapper>
                <img
                  src={
                    recommendedCars.find(car => car.name === values.car)?.photo
                  }
                  alt=""
                />
                <HeadingPrimary>
                  {
                    recommendedCars.find(car => car.name === values.car)
                      ?.caption
                  }
                </HeadingPrimary>
              </PhotoWrapper>
            )}
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

const Review: React.FC = () => {
  return (
    <div style={{ height: '100%' }}>
      <Header description="Avaliação" />
      <Form />
    </div>
  );
};

export default Review;

import React, {
  useCallback,
  useEffect,
  useState,
  useRef,
  useMemo,
} from 'react';
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

import Button from '../../components/Button';
import Header from '../../components/Header';
import './styles.css';

import { HeadingPrimary, ParagraphPrimary } from '../../components/Typography';
import { StepperFooter, StepperForm, Step, FormGroup, TextareaWrapper } from './styles';
import Textarea from '../../components/Textarea';
import Input from '../../components/Input';
import Checkbox from '../../components/Checkbox';

type FormValues = {
  identification: string;
  anonymous: boolean;
  car: string;
  text: string;
};

type RecommendationType = {
  [key: string]: string;
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

  // const initialResult = useMemo(
  //   () => ({
  //     recommendation: '',
  //     entities: [],
  //   }),
  //   [],
  // );
  const initialResult = useMemo(
    () => ({
      recommendation: 'MAREA',
      entities: [
        { entity: 'DESEMPENHO', sentiment: -0.940702, mention: 'desempenho' },
      ],
    }),
    [],
  );

  const carPhotos: RecommendationType = useMemo(
    () => ({
      ARGO,
      CRONOS,
      DUCATO,
      FIAT500,
      FIORINO,
      LINEA,
      MAREA,
      RENEGADE,
      TORO,
    }),
    [],
  );

  const carouselCaptions = useMemo(
    () => [
      'Fiat Argo',
      'Fiat Cronos',
      'Fiat Ducato',
      'Fiat 500',
      'Fiat Fiorino',
      'Fiat Linea',
      'Fiat Marea',
      'Jeep Renegade',
      'Fiat Toro',
    ],
    [],
  );

  const recommendedCars: RecommendationType = useMemo(
    () => ({
      ARGO: 'Fiat Argo',
      CRONOS: 'Fiat Cronos',
      DUCATO: 'Fiat Ducato',
      FIAT500: 'Fiat 500',
      FIORINO: 'Fiat Fiorino',
      LINEA: 'Fiat Linea',
      MAREA: 'Fiat Marea',
      RENEGADE: 'Jeep Renegade',
      TORO: 'Fiat Toro',
    }),
    [],
  );

  const commentMaxLength = useMemo(() => 200, []);

  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState(initialErrors);
  const [touched, setTouched] = useState(initialTouched);
  const [apiResults, setApiResults] = useState(initialResult);
  const [currentStep, setCurrentStep] = useState(2);
  const [currentSlide, setCurrentSlide] = useState(0);

  const trackRef = useRef<HTMLUListElement>(null);

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

  const prevStep = useCallback(() => {
    setCurrentStep(oldStep => oldStep - 1);
  }, []);

  const nextStep = useCallback(() => {
    setCurrentStep(oldStep => oldStep + 1);
  }, []);

  const selectStep = useCallback(stepNumber => {
    setCurrentStep(stepNumber);
  }, []);

  const previousSlide = useCallback(() => {
    setCurrentSlide(oldSlide => oldSlide - 1);
  }, []);

  const nextSlide = useCallback(() => {
    setCurrentSlide(oldSlide => oldSlide + 1);
  }, []);

  const selectSlide = useCallback(slideNumber => {
    setCurrentSlide(slideNumber);
  }, []);

  const selectSlideUsingTouch = useCallback(() => {
    setTimeout(() => {
      if (trackRef.current !== null) {
        trackRef.current.click();
        const slideNumber = Math.round(
          trackRef.current.scrollLeft / trackRef.current.offsetWidth,
        );
        setCurrentSlide(slideNumber);
      }
    }, 300);
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
            }

            if (values.identification === dbIdentification) {
              setValues(oldValues => ({
                ...oldValues,
                car: dbCar,
              }));
              selectStep(2);
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

                nextStep();
              });
          }
          break;
        default:
          break;
      }
    },
    [
      currentStep,
      nextStep,
      errors,
      setTouched,
      values,
      defineErrorMessage,
      selectStep,
    ],
  );

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

    if (!values.text) {
      defineErrorMessage('text', 'Necessário fazer um comentário.');
    }
    if (values.text) {
      defineErrorMessage('text', '');
    }
  }, [values, defineErrorMessage]);

  // Carousel mechanics
  useEffect(() => {
    if (trackRef.current !== null) {
      const slideWidth = trackRef.current.offsetWidth;
      return trackRef.current.scrollTo(currentSlide * slideWidth, 0);
    }
    return undefined;
  }, [currentSlide, trackRef]);

  // Set current car on form
  useEffect(() => {
    const currentCarOnCarousel = carouselCaptions[currentSlide];
    const carList = Object.keys(recommendedCars);
    const car = carList.find(
      key => recommendedCars[key] === currentCarOnCarousel,
    );

    if (car !== undefined) {
      setValues(oldValues => ({ ...oldValues, car }));
    }
  }, [setValues, carouselCaptions, currentSlide, recommendedCars]);

  return (
    <StepperForm onSubmit={event => handleSubmit(event)}>
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
                hasError={
                  touched.identification &&
                  !!errors.identification &&
                  !values.anonymous
                }
                touched={touched.identification}
              />
              <Checkbox
                id="anonymous"
                label="Quero avaliar anonimamente"
                name="anonymous"
                checked={values.anonymous}
                onChange={event => handleChange(event)}
                onBlur={event => handleBlur(event)}
                disabled={!!values.identification}
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
                width: 'min(60vw, 60rem)',
                margin: '4.8rem auto 0',
              }}
            >
              <div className="carousel__container">
                <div className="carousel__wrapper">
                  <button
                    className="carousel__slide-button left"
                    type="button"
                    onClick={() => previousSlide()}
                    disabled={currentSlide === 0}
                  >
                    &#10094;
                  </button>
                  <button
                    className="carousel__slide-button right"
                    type="button"
                    onClick={() => nextSlide()}
                    disabled={currentSlide === 8}
                  >
                    &#10095;
                  </button>
                  <ul
                    className="carousel__slider"
                    ref={trackRef}
                    onTouchEnd={() => selectSlideUsingTouch()}
                  >
                    <li className="carousel__item">
                      <img className="carousel__image" src={ARGO} alt="argo" />
                    </li>
                    <li className="carousel__item">
                      <img
                        className="carousel__image"
                        src={CRONOS}
                        alt="cronos"
                      />
                    </li>
                    <li className="carousel__item">
                      <img
                        className="carousel__image"
                        src={DUCATO}
                        alt="ducato"
                      />
                    </li>
                    <li className="carousel__item">
                      <img
                        className="carousel__image"
                        src={FIAT500}
                        alt="fiat500"
                      />
                    </li>
                    <li className="carousel__item">
                      <img
                        className="carousel__image"
                        src={FIORINO}
                        alt="fiorino"
                      />
                    </li>
                    <li className="carousel__item">
                      <img
                        className="carousel__image"
                        src={LINEA}
                        alt="linea"
                      />
                    </li>
                    <li className="carousel__item">
                      <img
                        className="carousel__image"
                        src={MAREA}
                        alt="marea"
                      />
                    </li>
                    <li className="carousel__item">
                      <img
                        className="carousel__image"
                        src={RENEGADE}
                        alt="renegade"
                      />
                    </li>
                    <li className="carousel__item">
                      <img className="carousel__image" src={TORO} alt="toro" />
                    </li>
                  </ul>
                  <div className="carousel__nav">
                    <button
                      type="button"
                      aria-label="slide-0"
                      className={`carousel__nav-indicator ${
                        currentSlide === 0 && 'active'
                      }`}
                      onClick={() => selectSlide(0)}
                    />
                    <button
                      type="button"
                      aria-label="slide-1"
                      className={`carousel__nav-indicator ${
                        currentSlide === 1 && 'active'
                      }`}
                      onClick={() => selectSlide(1)}
                    />
                    <button
                      type="button"
                      aria-label="slide-2"
                      className={`carousel__nav-indicator ${
                        currentSlide === 2 && 'active'
                      }`}
                      onClick={() => selectSlide(2)}
                    />
                    <button
                      type="button"
                      aria-label="slide-3"
                      className={`carousel__nav-indicator ${
                        currentSlide === 3 && 'active'
                      }`}
                      onClick={() => selectSlide(3)}
                    />
                    <button
                      type="button"
                      aria-label="slide-4"
                      className={`carousel__nav-indicator ${
                        currentSlide === 4 && 'active'
                      }`}
                      onClick={() => selectSlide(4)}
                    />
                    <button
                      type="button"
                      aria-label="slide-5"
                      className={`carousel__nav-indicator ${
                        currentSlide === 5 && 'active'
                      }`}
                      onClick={() => selectSlide(5)}
                    />
                    <button
                      type="button"
                      aria-label="slide-6"
                      className={`carousel__nav-indicator ${
                        currentSlide === 6 && 'active'
                      }`}
                      onClick={() => selectSlide(6)}
                    />
                    <button
                      type="button"
                      aria-label="slide-7"
                      className={`carousel__nav-indicator ${
                        currentSlide === 7 && 'active'
                      }`}
                      onClick={() => selectSlide(7)}
                    />
                    <button
                      type="button"
                      aria-label="slide-8"
                      className={`carousel__nav-indicator ${
                        currentSlide === 8 && 'active'
                      }`}
                      onClick={() => selectSlide(8)}
                    />
                  </div>
                </div>
                <HeadingPrimary>
                  {carouselCaptions[currentSlide]}
                </HeadingPrimary>
              </div>
            </div>
          </Step>
        )}
        {currentStep === 2 && (
          <Step>
            <div>
              <HeadingPrimary>Comentário</HeadingPrimary>
              <ParagraphPrimary>
                {`Escreva abaixo o que você achou do ${
                  recommendedCars[values.car]
                }`}
              </ParagraphPrimary>
            </div>
            <TextareaWrapper>
              <Textarea
                name="text"
                id="text"
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
          <section
            className={`section--${currentStep === 3 ? 'active' : 'hide'}`}
          >
            <h1>Obrigado</h1>
            {apiResults.recommendation && (
              <>
                <p>Que pena que você não gostou do carro :(</p>
                <p>
                  {`Caso queira realizar um novo test drive conosco,
              sugerimos o ${recommendedCars[apiResults.recommendation]}.`}
                </p>
                <img
                  src={carPhotos[apiResults.recommendation]}
                  alt={recommendedCars[apiResults.recommendation]}
                />
                <p>{recommendedCars[apiResults.recommendation]}</p>

                <Button to="/review">Agendar test drive</Button>
              </>
            )}
            {!apiResults.recommendation && apiResults.entities.length && (
              <>
                <p>Maravilha! Ficamos felizes que tenha gostado!</p>
                <p>Caso tenha se identificado, entraremos em contato.</p>
                <img
                  src={carPhotos[values.car]}
                  alt={recommendedCars[values.car]}
                />
                <p>{recommendedCars[values.car]}</p>
              </>
            )}
            {!apiResults.recommendation && !apiResults.entities.length && (
              <>
                <p>Não conseguimos processar seu comentário...</p>
                <p>Por favor, tente novamente mais tarde.</p>
              </>
            )}
            <h1>{JSON.stringify(apiResults, null, 2)}</h1>
          </section>
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

const TesteStepper: React.FC = () => {
  return (
    <div style={{ height: '100%' }}>
      <Header description="Avaliação" />
      <Form />
    </div>
  );
};

export default TesteStepper;

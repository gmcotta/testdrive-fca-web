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

import './styles.css';
import Button from '../../components/Button';

type FormValues = {
  identification: string;
  anonymous: boolean;
  car: string;
  text: string;
};

type RecommendationType = {
  [key: string]: string;
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
  const initialResult = {
    recommendation: '',
    entities: [],
  };

  const carPhotos: RecommendationType = useMemo(
    () => ({
      ARGO: ARGO,
      CRONOS: CRONOS,
      DUCATO: DUCATO,
      FIAT500: FIAT500,
      FIORINO: FIORINO,
      LINEA: LINEA,
      MAREA: MAREA,
      RENEGADE: RENEGADE,
      TORO: TORO
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

  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState(initialErrors);
  const [touched, setTouched] = useState(initialTouched);
  const [apiResults, setApiResults] = useState(initialResult);
  const [carPhoto, setCarPhoto] = useState('');

  const [currentStep, setCurrentStep] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const trackRef = useRef<HTMLUListElement>(null);
  const commentMaxLength = 200;

  const defineErrorMessage = useCallback((key, message) => {
    setErrors(oldErrors => ({
      ...oldErrors,
      [key]: message,
    }));
  }, []);

  // Set error messages
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

  const selectStep = useCallback((stepNumber) => {
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
                const recommendationWithoutSpace = response.data.recommendation.replace(' ', '');
                console.log(recommendationWithoutSpace);
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
    [currentStep, nextStep, errors, setTouched, values, defineErrorMessage, selectStep],
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
                <img className="carousel__image" src={CRONOS} alt="cronos" />
              </li>
              <li className="carousel__item">
                <img className="carousel__image" src={DUCATO} alt="ducato" />
              </li>
              <li className="carousel__item">
                <img className="carousel__image" src={FIAT500} alt="fiat500" />
              </li>
              <li className="carousel__item">
                <img className="carousel__image" src={FIORINO} alt="fiorino" />
              </li>
              <li className="carousel__item">
                <img className="carousel__image" src={LINEA} alt="linea" />
              </li>
              <li className="carousel__item">
                <img className="carousel__image" src={MAREA} alt="marea" />
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
          <p>{carouselCaptions[currentSlide]}</p>
        </div>
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
        {apiResults.recommendation && (
          <>
            <p>{'Que pena que você não gostou do carro :('}</p>
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
            <img src={carPhotos[values.car]} alt={recommendedCars[values.car]}/>
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

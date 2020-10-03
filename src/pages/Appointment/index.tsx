import React, { useCallback, useEffect, useState, useMemo } from 'react';
import Lottie from 'react-lottie';
import Modal from 'react-modal';
import { MdClose, MdLocationOn, MdPhone } from 'react-icons/md';
import { Map, TileLayer, Marker } from 'react-leaflet';
import Calendar from 'react-calendar';
import { startOfDay } from 'date-fns';
import 'react-calendar/dist/Calendar.css';
import './styles.css';

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

import { serverApi } from '../../services/api';
import formatCurrency from '../../services/formatCurrency';

import Button from '../../components/Button';
import Header from '../../components/Header';
import { HeadingPrimary, ParagraphPrimary } from '../../components/Typography';
import Textarea from '../../components/Textarea';
import Input from '../../components/Input';
import Checkbox from '../../components/Checkbox';
import Carousel from '../../components/Carousel';
import Accordion from '../../components/Accordion';

import { StepperForm, Step, StepperFooter, FormGroup } from './styles';

Modal.setAppElement('#root');

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
  car: string;
  dealershipOrHome: string;
  dealershipId: number;
  appointmentDay: Date | Date[];
  appointmentHour: number;
};

type DealershipDetailsValues = {
  id: number;
  latitude: number;
  longitude: number;
};

type AvailabilityValues = {
  hour: number;
  available: boolean;
};

type ScheduleValues = {
  day: string;
  hours: AvailabilityValues[];
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
      car: '',
      dealershipOrHome: '',
      dealershipId: 0,
      appointmentDay: startOfDay(new Date()),
      appointmentHour: 0,
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

  const initialCarDetails = useMemo(
    () => ({
      name: '',
      price: '',
      specs: [],
    }),
    [],
  );

  const initialDealershipDetails = useMemo(
    () => ({
      id: 0,
      latitude: 0,
      longitude: 0,
      name: '',
      address: '',
      addressNumber: 0,
      neighborhood: '',
      city: '',
      uf: '',
      phone: '',
      photo: '',
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

  const defaultAvailability = useMemo(
    () => [
      { available: true, hour: 8 },
      { available: true, hour: 9 },
      { available: true, hour: 10 },
      { available: true, hour: 11 },
      { available: true, hour: 12 },
      { available: true, hour: 13 },
      { available: true, hour: 14 },
      { available: true, hour: 15 },
      { available: true, hour: 16 },
      { available: true, hour: 17 },
    ],
    [],
  );

  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState(initialErrors);
  const [touched, setTouched] = useState(initialTouched);
  const [currentStep, setCurrentStep] = useState(2);
  const [carDetails, setCarDetails] = useState(initialCarDetails);
  const [dealershipLocations, setDealershipLocations] = useState<
    DealershipDetailsValues[]
  >([]);
  const [dealershipDetails, setDealershipDetails] = useState(
    initialDealershipDetails,
  );
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [initialPosition, setInitialPosition] = useState<[number, number]>([
    -23.5537361,
    -46.6538222,
  ]);
  const [selectedDate, setSelectedDate] = useState<Date | Date[]>(new Date());
  const [dealershipSchedule, setDealershipSchedule] = useState<
    ScheduleValues[]
  >([]);
  const [scheduleFullDays, setScheduleFullDays] = useState<Date[]>([]);
  const [availability, setAvailability] = useState<AvailabilityValues[]>(
    defaultAvailability,
  );

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
    if (currentStep >= 2) {
      setValues(oldValues => ({ ...oldValues, dealershipOrHome: '' }));
    }
    setCurrentStep(oldStep => oldStep - 1);
  }, [currentStep]);

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
          setValues(oldValues => ({
            ...oldValues,
            dealershipOrHome: '',
          }));
          nextStep();
          break;
        case 2:
          if (values.dealershipId !== 0) {
            nextStep();
          }
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

  useEffect(() => {
    if (values.dealershipOrHome === 'dealership') {
      serverApi.get('/dealerships-locations').then(response => {
        setDealershipLocations(response.data);
      });
    }
  }, [values]);

  // Get all busy days
  useEffect(() => {
    if (currentStep === 3) {
      serverApi.get('dealerships-schedule/1').then(response => {
        const { schedule } = response.data;
        setDealershipSchedule(schedule);
        schedule.map((day: ScheduleValues) => {
          const filledHourQuantity = day.hours.reduce((acc, { available }) => {
            return !available ? acc + 1 : acc;
          }, 0);
          if (day.hours.length === filledHourQuantity) {
            setScheduleFullDays(oldValues => [...oldValues, new Date(day.day)]);
          }
        });
      });
    }
  }, [currentStep]);

  useEffect(() => {
    setValues(oldValues => ({
      ...oldValues,
      appointmentHour: 0,
    }));
    const hours = dealershipSchedule.find(schedule => {
      return (
        startOfDay(new Date(schedule.day)).toLocaleString() ===
        startOfDay(new Date(selectedDate.toString())).toLocaleString()
      );
    })?.hours;
    if (hours !== undefined) {
      setAvailability(hours);
    } else {
      setAvailability(defaultAvailability);
    }
  }, [dealershipSchedule, selectedDate, defaultAvailability]);

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
                className="data-form-container__first-row"
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
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <div>
                <HeadingPrimary>Carro</HeadingPrimary>
                <ParagraphPrimary>{`Ótimo, ${values.firstName}! Agora, escolha seu carro.`}</ParagraphPrimary>
              </div>
              <div
                style={{
                  width: 'min(40vw, 40rem)',
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
              <button
                style={{
                  padding: '1.6rem',
                  margin: '1.6rem 0',
                  borderRadius: '4px',
                  border: 'none',
                  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.25)',
                  cursor: 'pointer',
                  fontSize: '2.4rem',
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                  backgroundColor: 'var(--color-primary)',
                  color: 'var(--color-light)',
                  alignSelf: 'center',
                }}
                type="button"
                onClick={() => {
                  serverApi.get(`specs?car=${values.car}`).then(response => {
                    const { name, price, specs } = response.data[0];
                    setCarDetails(oldValues => ({
                      ...oldValues,
                      name,
                      price: formatCurrency(price),
                      specs,
                    }));
                  });
                  setModalIsOpen(true);
                }}
              >
                Ver detalhes
              </button>
              <Modal
                isOpen={modalIsOpen}
                onRequestClose={() => setModalIsOpen(false)}
                shouldCloseOnOverlayClick
                style={{
                  overlay: {
                    backgroundColor: 'rgba(0, 0, 0, 0.1)',
                    zIndex: 1000,
                  },
                  content: {
                    left: '50%',
                    top: '50%',
                    transform: 'translateX(-50%) translateY(-50%)',
                    backgroundColor: 'var(--color-white)',
                    border: '1px solid var(--color-primary)',
                    display: 'flex',
                    height: '80vh',
                    flexDirection: 'column',
                  },
                }}
              >
                <MdClose
                  size={20}
                  style={{
                    cursor: 'pointer',
                    position: 'absolute',
                    top: '0.8rem',
                    right: '0.8rem',
                  }}
                  onClick={() => {
                    setModalIsOpen(false);
                  }}
                />
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-end',
                    marginBottom: '1.6rem',
                    borderBottom: '1px solid var(--color-primary)',
                  }}
                >
                  <h1
                    style={{
                      textTransform: 'uppercase',
                      fontSize: '3.2rem',
                      color: 'var(--color-primary)',
                    }}
                  >
                    {carDetails.name}
                  </h1>
                  <span
                    style={{
                      fontSize: '2rem',
                      color: 'var(--color-primary)',
                    }}
                  >
                    {carDetails.price}
                  </span>
                </div>
                <Accordion specs={carDetails.specs} />
              </Modal>
            </div>
          </Step>
        )}
        {currentStep === 2 && (
          <Step>
            <div style={{ height: '100%' }}>
              <HeadingPrimary>Local</HeadingPrimary>
              {values.dealershipOrHome === '' && (
                <>
                  <div>
                    <ParagraphPrimary>Excelente escolha!</ParagraphPrimary>
                    <ParagraphPrimary>
                      O próximo passo é escolher o local do test drive.
                    </ParagraphPrimary>
                    <ParagraphPrimary>
                      Pode optar em ir na concessionária, ou receber o carro no
                      endereço indicado anteriormente.
                    </ParagraphPrimary>
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      margin: '3.2rem 0',
                    }}
                  >
                    <button
                      style={{
                        padding: '1.6rem',
                        margin: '1.6rem 0',
                        borderRadius: '4px',
                        border: 'none',
                        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.25)',
                        cursor: 'pointer',
                        fontSize: '2.4rem',
                        textTransform: 'uppercase',
                        textDecoration: 'none',
                        backgroundColor: 'var(--color-primary)',
                        color: 'var(--color-light)',
                        alignSelf: 'center',
                      }}
                      type="button"
                      onClick={() => {
                        setValues(oldValues => ({
                          ...oldValues,
                          dealershipOrHome: 'dealership',
                        }));
                      }}
                    >
                      Vou na concessionária
                    </button>
                    <button
                      style={{
                        padding: '1.6rem',
                        margin: '1.6rem 0',
                        borderRadius: '4px',
                        border: 'none',
                        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.25)',
                        cursor: 'pointer',
                        fontSize: '2.4rem',
                        textTransform: 'uppercase',
                        textDecoration: 'none',
                        backgroundColor: 'var(--color-primary)',
                        color: 'var(--color-light)',
                        alignSelf: 'center',
                      }}
                      type="button"
                      onClick={() => {
                        setValues(oldValues => ({
                          ...oldValues,
                          dealershipOrHome: 'home',
                        }));
                        nextStep();
                      }}
                    >
                      Quero receber o vendedor
                    </button>
                  </div>
                </>
              )}
              {values.dealershipOrHome === 'dealership' && (
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'space-between',
                    height: 'calc(100% - 49px)',
                  }}
                >
                  <ParagraphPrimary>
                    Selecione a concessionária mais perto de você.
                  </ParagraphPrimary>
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '1fr 1fr',
                      columnGap: '1.6rem',
                      margin: '3.2rem 0',
                      height: 'calc(100% - 34px)',
                    }}
                  >
                    <Map
                      center={initialPosition}
                      zoom={12}
                      // onmoveend={event => console.log(event.target.getBounds())}
                    >
                      <TileLayer
                        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      />
                      {dealershipLocations &&
                        dealershipLocations.map(location => (
                          <Marker
                            key={location.id}
                            position={[location.latitude, location.longitude]}
                            onclick={() => {
                              console.log(location.id);
                              serverApi
                                .get(`/dealerships/${location.id}`)
                                .then(response => {
                                  const dealership = response.data;
                                  setDealershipDetails(dealership);
                                  setValues(oldValues => ({
                                    ...oldValues,
                                    dealershipId: response.data.id,
                                  }));
                                });
                            }}
                          />
                        ))}
                    </Map>
                    <div
                      style={{
                        backgroundColor: 'var(--color-white)',
                        borderRadius: '4px',
                        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
                        padding: '1.6rem',
                      }}
                    >
                      {values.dealershipId === 0 ? (
                        <div>
                          <p>Escolha uma concessionária para avançar</p>
                        </div>
                      ) : (
                        <>
                          <div
                            style={{
                              display: 'flex',
                              justifyContent: 'center',
                            }}
                          >
                            <img
                              style={{
                                width: '80%',
                                margin: '0 auto',
                              }}
                              src={dealershipDetails.photo}
                              alt={dealershipDetails.name}
                            />
                          </div>
                          <p
                            style={{
                              fontSize: '2.4rem',
                              textAlign: 'center',
                              marginTop: '0.8rem',
                              paddingBottom: '0.8rem',
                              borderBottom: '1px solid var(--color-primary)',
                              fontWeight: 'bold',
                            }}
                          >
                            {dealershipDetails.name}
                          </p>
                          <div
                            style={{
                              display: 'flex',
                              marginTop: '1.6rem',
                              fontSize: '2rem',
                            }}
                          >
                            <MdLocationOn
                              color="var(--color-primary)"
                              style={{ marginRight: '0.8rem', flex: 'none' }}
                            />
                            <div>
                              <p>{`${dealershipDetails.address}, ${dealershipDetails.addressNumber}`}</p>
                              <p>{dealershipDetails.neighborhood}</p>
                              <p>{`${dealershipDetails.city} - ${dealershipDetails.uf}`}</p>
                            </div>
                          </div>
                          <div
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              marginTop: '0.8rem',
                              fontSize: '2rem',
                            }}
                          >
                            <MdPhone
                              color="var(--color-primary)"
                              style={{ marginRight: '0.8rem', flex: 'none' }}
                            />
                            <p>{dealershipDetails.phone}</p>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </Step>
        )}
        {currentStep === 3 && (
          <Step>
            <div>
              <HeadingPrimary>Dia e hora</HeadingPrimary>
              <ParagraphPrimary>
                Falta pouco! Escolha o melhor dia e hora para você.
              </ParagraphPrimary>
            </div>
            <div style={{ height: 'calc(100% - 34px)' }}>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  columnGap: '1.6rem',
                  margin: '3.2rem 0',
                  height: 'calc(100% - 84px - 3.2rem)',
                }}
              >
                <div>
                  <Calendar
                    value={selectedDate}
                    onChange={value => {
                      setSelectedDate(value);
                      setValues(oldValues => ({
                        ...oldValues,
                        appointmentDay: value,
                      }));
                    }}
                    locale="pt-BR"
                    minDate={new Date()}
                  />
                </div>
                <div className="hour-button-container">
                  {availability.map(hour => (
                    <button
                      className={`hour-button${
                        values.appointmentHour === hour.hour ? '--active' : ''
                      }`}
                      key={hour.hour}
                      type="button"
                      disabled={!hour.available}
                      onClick={() => {
                        setValues(oldValues => ({
                          ...oldValues,
                          appointmentHour: hour.hour,
                        }));
                      }}
                    >
                      {`${hour.hour}:00`}
                    </button>
                  ))}
                </div>
              </div>
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
        <button
          type="submit"
          disabled={
            currentStep === 5 ||
            (currentStep === 2 && values.dealershipOrHome === '') ||
            (currentStep === 2 &&
              values.dealershipOrHome === 'dealership' &&
              values.dealershipId === 0) ||
            values.appointmentHour === 0
          }
        >
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

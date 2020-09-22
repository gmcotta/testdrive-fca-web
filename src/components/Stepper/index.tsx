import React, { useCallback, useState } from 'react';

import { MdCheck } from 'react-icons/md';

import {
  Container,
  StepperHeader,
  HeaderStep,
  ProgressLine,
  StepperFooter,
} from './styles';

import './styles.css';

type StepperProps = {
  steps: {
    title: string;
    page: string;
  }[];
  header?: boolean;
  footer?: boolean;
};

const Stepper: React.FC<StepperProps> = ({ steps, header, footer }) => {
  const [currentStep, setCurrentStep] = useState<number>(0);

  const headerStepClassName = (index: number) => {
    if (index < currentStep) return 'passed';
    if (index === currentStep) return 'current';
    if (index > currentStep) return 'next';
  };

  const previousStep = useCallback(() => {
    setCurrentStep(oldStep => oldStep - 1);
  }, []);

  const nextStep = useCallback(() => {
    setCurrentStep(oldStep => oldStep + 1);
  }, []);

  return (
    <Container>
      <StepperHeader>
        {steps.map((step, index) => (
          <>
            <HeaderStep key={`step-${index + 1}`}>
              <div className={headerStepClassName(index)}>
                {currentStep > index ? (
                  <span className="checkmark">
                    <MdCheck />
                  </span>
                ) : (
                  <span>{index + 1}</span>
                )}
              </div>
            </HeaderStep>
            {!(index === steps.length - 1) && (
              <ProgressLine>
                <span className={headerStepClassName(index)} />
              </ProgressLine>
            )}
          </>
        ))}
      </StepperHeader>
      <div>
        {steps.map((step, index) => (
          <span
            key={`page-${step.page}`}
            className={index === currentStep ? 'page--active' : 'page--hide'}
          >
            {step.page}
          </span>
        ))}
      </div>
      <StepperFooter>
        <button
          type="button"
          onClick={() => previousStep()}
          disabled={currentStep === 0}
        >
          Voltar
        </button>
        <button
          type="button"
          onClick={() => nextStep()}
          disabled={currentStep === steps.length}
        >
          {currentStep === steps.length - 1 ? 'Enviar' : 'Avançar'}
        </button>
      </StepperFooter>
    </Container>
  );
};

export default Stepper;

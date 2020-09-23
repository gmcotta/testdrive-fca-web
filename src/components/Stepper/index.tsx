import React, { useCallback, useState } from 'react';

import { MdCheck } from 'react-icons/md';

import {
  Container,
  StepperHeader,
  HeaderStep,
  ProgressLine,
  StepperContent,
  StepperFooter,
} from './styles';

type StepperProps = {
  steps: {
    title: string;
    page: JSX.Element;
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
      {header && (
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
      )}
      <StepperContent>
        {steps.map((step, index) => (
          <div
            key={`page-${step.title}`}
            className={index === currentStep ? '' : 'hide'}
          >
            {step.page}
          </div>
        ))}
      </StepperContent>
      <StepperFooter>
        <button
          type="button"
          onClick={() => previousStep()}
          disabled={currentStep === 0 || currentStep === steps.length}
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

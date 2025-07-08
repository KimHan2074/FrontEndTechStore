import { useState } from "react";
import InformationOrder from "../../../components/user/Payment/InformationOrder";
import PaymentMethod from "../../../components/user/Payment/PaymentMethod";
const Payment = () => {
  const [currentStep, setCurrentStep] = useState(1);

  const handleChangeStep = (step) => {
    if (step <= currentStep + 1) { 
      setCurrentStep(step);
    }
  };

  return (
    <>
      {currentStep === 1 && (
        <InformationOrder
          onContinue={() => setCurrentStep(2)}
          currentStep={currentStep}
          setCurrentStep={handleChangeStep}
        />
      )}
      {currentStep === 2 && (
        <PaymentMethod
          onAccept={() => setCurrentStep(3)}
          currentStep={currentStep}
          setCurrentStep={handleChangeStep}
        />
      )}
    </>
  );
};

export default Payment;

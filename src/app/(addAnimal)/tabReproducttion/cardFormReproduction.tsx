import FormReproduction from "./form/formReproduction";
import { FormAddKids } from "../../../components/ui/formAddKids";
import { useState, useRef, useEffect } from "react";

interface Animal {
  id: string;
  manualId: number | null;
  gender: string | null;
  birthDate: Date | null;
  weight: number | null;
  breed: string | null;
  category: string | null;
  motherId: string | null;
  fatherId: string | null;
  reproductiveStatus: string | null;
  handlingType: string | null;
  bullId: string | null;
  protocol: string | null;
  andrological: string | null;
  fetalGender: string | null;
  expectedDueDate: Date | null;
  bullIatf: string | null;
  bodyConditionScore: number | null;
}

interface CardFormReproductionProps {
  animals: Animal[];
  allDataForm: Animal;
  handleInputValues: (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => void;
  setTabValue: React.Dispatch<React.SetStateAction<string>>;
}

export const CardFormReproduction: React.FC<CardFormReproductionProps> = ({
  animals,
  allDataForm,
  handleInputValues,
  setTabValue,
}) => {
  const [statusComponentAddKids, setStatusComponentAddKids] =
    useState<boolean>(false);
  const formAddKidsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (statusComponentAddKids && formAddKidsRef.current) {
      formAddKidsRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [statusComponentAddKids]);

  return (
    <>
      <FormReproduction
        setStatusComponentAddKids={setStatusComponentAddKids}
        animals={animals}
        allDataForm={allDataForm}
        handleInputValues={handleInputValues}
        setTabValue={setTabValue}
      />
      {statusComponentAddKids && (
        <div ref={formAddKidsRef}>
          <FormAddKids
            setStatusComponentAddKids={setStatusComponentAddKids}
            animals={animals}
          />
        </div>
      )}
    </>
  );
};
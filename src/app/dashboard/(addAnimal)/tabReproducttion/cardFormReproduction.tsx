import FormReproduction from "./form/formReproduction";
import { FormAddKids } from "../../../../components/ui/formAddKids";
import { useState, useRef, useEffect } from "react";
import { Animal } from "@/types/animal";
import { User } from '@/types/user';

interface InterfaceAddDataKids {
  handlingType: string;
  bullId: string;
  protocol: string;
  andrological: string;
  gender: string;
  birthday: string;
  bodyConditionScore: string;
  bullIatf: string;
}

interface CardFormReproductionProps {
  animals: Animal[];
  allDataForm: Animal;
  users: User[];
  handleInputValues: (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => void;
  setTabValue: React.Dispatch<React.SetStateAction<string>>;
}

export const CardFormReproduction: React.FC<CardFormReproductionProps> = ({
  animals,
  allDataForm,
  users,
  handleInputValues,
  setTabValue,
}) => {
  const [dataKids, setDataKids] = useState<InterfaceAddDataKids>({
    handlingType: "",
    bullId: "",
    protocol: "",
    andrological: "",
    gender: "",
    birthday: "",
    bodyConditionScore: "",
    bullIatf: "",
  });
  const [statusComponentAddKids, setStatusComponentAddKids] =
    useState<boolean>(false);
  const formAddKidsRef = useRef<HTMLDivElement>(null);

  function handleDataKids(
    event: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>,
  ) {
    const { name, value, type } = event.target;
    const newValue = type === "number" ? parseInt(value) : value;

    setDataKids((prevData) => ({
      ...prevData,
      [name]: newValue,
    }));
  }

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
        users={users}
        allDataForm={allDataForm}
        handleInputValues={handleInputValues}
        setTabValue={setTabValue}
      />
      {statusComponentAddKids && (
        <div ref={formAddKidsRef}>
          <FormAddKids
            setStatusComponentAddKids={setStatusComponentAddKids}
            animals={animals}
            handleDataKids={handleDataKids}
            dataKids={dataKids}
          />
        </div>
      )}
    </>
  );
};

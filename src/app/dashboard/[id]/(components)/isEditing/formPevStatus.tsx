import { Animal } from '@/types/animal';
import { GoAlertFill } from 'react-icons/go';

interface FormPevStatusProps {
  allDataForm: Animal;
  handleInputValues: (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  animals: Animal[];
}

export const FormPevStatus: React.FC<FormPevStatusProps> = () => {
  return (
    <>
      <article className="mt-4 flex flex-wrap gap-5">
        <p className="flex w-4/5 items-center gap-1 text-primary">
          <GoAlertFill className="w-20" />
          Ao confirmar o animal com o status de PEV, após 40 dias da data de
          hoje, a vaca retornará ao status de Vazia automaticamente, e será
          notificado.
        </p>
      </article>
    </>
  );
};

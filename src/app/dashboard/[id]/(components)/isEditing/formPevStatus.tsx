import { Animal } from '@/types/animal';
import { GoAlertFill } from 'react-icons/go';

interface FormPevStatusProps {
  allDataForm: Animal;
  handleInputValues: (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  animals: Animal[];
  pevDays: number;
  onPevDaysChange: (days: number) => void;
}

export const FormPevStatus: React.FC<FormPevStatusProps> = ({ pevDays, onPevDaysChange }) => {
  const returnDate = new Date();
  returnDate.setDate(returnDate.getDate() + pevDays);
  const formattedDate = returnDate.toLocaleDateString('pt-BR');

  return (
    <>
      <article className="mt-4 flex flex-wrap gap-5">
        <p className="flex w-4/5 items-center gap-1 text-primary">
          <GoAlertFill className="w-20" />
          Ao confirmar o animal com o status de PEV, após {pevDays} dias (em{' '}
          {formattedDate}), a vaca retornará ao status de Vazia automaticamente,
          e será notificada.
        </p>
        <div className="flex w-full items-center gap-3">
          <label htmlFor="pevDays" className="text-sm font-medium">
            Dias até retornar para Vazia:
          </label>
          <input
            id="pevDays"
            type="number"
            min={1}
            max={365}
            value={pevDays}
            onChange={(e) => onPevDaysChange(Math.max(1, Number(e.target.value)))}
            className="w-24 rounded-md border px-2 py-1 text-sm"
          />
        </div>
      </article>
    </>
  );
};

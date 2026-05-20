import { cn } from '@/lib/utils';

interface SelectFormProps {
  classNameDiv?: string;
  classNameInput?: string;
  htmlFor: string;
  label: string;
  name: string;
  id: string;
  value: string | number;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  options: { label?: string; value?: string | number }[];
  defaultOption?: string;
  disabled?: boolean;
}

export const SelectForm: React.FC<SelectFormProps> = ({
  htmlFor,
  label,
  name,
  id,
  value,
  onChange,
  options,
  defaultOption = 'Selecione uma opção',
  disabled,
  classNameDiv,
  classNameInput,
}) => {
  return (
    <div className={cn('flex flex-col gap-1.5', classNameDiv)}>
      <label
        className="text-[0.7rem] font-semibold uppercase text-muted-foreground"
        htmlFor={htmlFor}
      >
        {label}
      </label>
      <select
        name={name}
        id={id}
        value={value}
        onChange={onChange}
        required
        disabled={disabled}
        className={cn(
          'h-11 w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground shadow-sm outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/15 disabled:cursor-not-allowed disabled:bg-muted disabled:text-muted-foreground',
          classNameInput
        )}
      >
        <option value="" disabled>
          {defaultOption}
        </option>
        {options.map((option, index) => (
          <option value={option.value} key={index}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

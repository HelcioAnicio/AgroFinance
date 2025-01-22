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
    <div className={`flex flex-col gap-1 ${classNameDiv}`}>
      <label className="text-secondary" htmlFor={htmlFor}>
        {label}
      </label>
      <select
        name={name}
        id={id}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={`min-w-max flex-1 border border-b border-b-primary bg-transparent outline-none ${classNameInput}`}
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

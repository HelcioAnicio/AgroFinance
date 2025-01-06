interface SelectFormProps {
  htmlFor: string;
  label: string;
  name: string;
  id: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  options: { label?: string; value?: string }[];
  defaultOption?: string;
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
}) => {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-secondary" htmlFor={htmlFor}>
        {label}
      </label>
      <select
        name={name}
        id={id}
        value={value}
        onChange={onChange}
        className="min-w-24 flex-1 border border-b border-b-primary bg-transparent outline-none"
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

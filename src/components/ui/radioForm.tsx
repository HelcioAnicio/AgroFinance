interface RadioFormProps {
  htmlFor: string;
  label: string;
  type: string;
  name: string;
  id: string;
  value: string;
  checked: boolean;
  onChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
}

export const RadioForm: React.FC<RadioFormProps> = ({
  htmlFor,
  label,
  type,
  name,
  id,
  value,
  checked,
  onChange,
}) => {
  return (
    <>
      <div className="flex items-center gap-1">
        <input
          type={type}
          name={name}
          id={id}
          value={value}
          checked={checked}
          required
          onChange={onChange}
        />
        <label htmlFor={htmlFor} className="py-2">
          {label}
        </label>
      </div>
    </>
  );
};

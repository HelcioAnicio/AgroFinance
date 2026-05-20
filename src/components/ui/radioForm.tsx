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
      <div className="flex h-11 items-center gap-2 rounded-md border border-border bg-background px-3 text-sm shadow-sm">
        <input
          className="h-4 w-4 accent-primary"
          type={type}
          name={name}
          id={id}
          value={value}
          checked={checked}
          required
          onChange={onChange}
        />
        <label htmlFor={htmlFor} className="flex-1 py-2">
          {label}
        </label>
      </div>
    </>
  );
};

interface InputFormProps {
  classNameDiv?: string;
  classNameInput?: string;
  htmlFor: string;
  label: string;
  type: string;
  name: string;
  id: string;
  value: string | number;
  onChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
}

export const InputForm: React.FC<InputFormProps> = ({
  classNameDiv,
  classNameInput,
  htmlFor,
  label,
  type,
  name,
  id,
  value,
  onChange,
}) => {
  return (
    <>
      <div className={classNameDiv}>
        <label className="text-secondary" htmlFor={htmlFor}>
          {label}
        </label>
        <input
          className={`${classNameInput} w-full max-w-32 border border-b border-b-primary bg-transparent outline-none`}
          type={type}
          name={name}
          id={id}
          value={value ?? ''}
          required
          onChange={onChange}
        />
      </div>
    </>
  );
};

import { cn } from '@/lib/utils';

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
    <div className={cn('flex flex-col gap-1.5', classNameDiv)}>
      <label
        className="text-[0.7rem] font-semibold uppercase text-muted-foreground"
        htmlFor={htmlFor}
      >
        {label}
      </label>
      <input
        className={cn(
          'h-11 w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground shadow-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/15 disabled:cursor-not-allowed disabled:bg-muted disabled:text-muted-foreground',
          classNameInput
        )}
        type={type}
        name={name}
        id={id}
        value={value ?? ''}
        required
        onChange={onChange}
      />
    </div>
  );
};

import GppMaybeIcon from '@mui/icons-material/GppMaybe';

interface FormErrorProps {
  message?: string;
}

export const FormError = ({ message }: FormErrorProps) => {
  if (!message) return null;
  return (
    <div className="bg-ghost p-2 flex items-center justify-center gap-x-2 text-md text-destructive">
      <GppMaybeIcon className="h-5 w-5" />
      <p>{message}</p>
    </div>
  );
};

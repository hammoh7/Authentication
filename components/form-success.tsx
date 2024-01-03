import CheckCircleIcon from '@mui/icons-material/CheckCircle';

interface FormSuccessProps {
  message?: string;
}

export const FormSuccess = ({ message }: FormSuccessProps) => {
  if (!message) return null;
  return (
    <div className="bg-ghost p-2 flex items-center gap-x-2 text-md text-green-500">
      <CheckCircleIcon className="h-5 w-5" />
      <p>{message}</p>
    </div>
  );
};

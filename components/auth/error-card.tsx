import { Header } from "./header";
import { BackButton } from "./back-button";
import { Card, CardHeader, CardFooter } from "../ui/card";
import { ErrorOutlineRounded } from "@mui/icons-material";

export const ErrorCard = () => {
  return (
    <Card className="w-[350px] shadow-md">
      <CardHeader>
        <Header label="Something went wrong!" />
      </CardHeader>
      <div>
        <ErrorOutlineRounded className="w-full items-center flex justify-center text-rose-500" />
        <p className="w-full items-center flex justify-center"> Try again to Login </p>
      </div>
      <CardFooter className="p-5">
        <BackButton label="Back" href="/Login" />
      </CardFooter>
    </Card>
  );
};

import { ExtendedUser } from "@/next-auth";
import { Card, CardContent, CardHeader } from "./ui/card";

interface UserInfoProps {
  user?: ExtendedUser;
  label: string;
}

export const UserInfo = ({ user, label }: UserInfoProps) => {
  return (
    <Card className="m-1.5 w-[600px] shadow-lg bg-blue-200">
      <CardHeader className="truncate p-3 rounded-md">
        <p className="text-xl font-semibold text-center">{label}</p>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex flex-row items-center justify-between rounded-lg border p-2 shadow-sm bg-white">
          <p className="text-sm font-medium">User ID</p>
          <p className="truncate max-w-[150px] font-mono p-1 bg-green-200 rounded-md">{user?.id}</p>
        </div>
        <div className="flex flex-row items-center justify-between rounded-lg border p-2 shadow-sm bg-white">
          <p className="text-sm font-medium">Name</p>
          <p className="truncate font-mono p-1 bg-green-200 rounded-md">{user?.name}</p>
        </div>
        <div className="flex flex-row items-center justify-between rounded-lg border p-2 shadow-sm bg-white">
          <p className="text-sm font-medium">Email ID</p>
          <p className="truncate font-mono p-1 bg-green-200 rounded-md">{user?.email}</p>
        </div>
        <div className="flex flex-row items-center justify-between rounded-lg border p-2 shadow-sm bg-white">
          <p className="text-sm font-medium">Role</p>
          <p className="truncate font-mono p-1 bg-green-200 rounded-md">{user?.role}</p>
        </div>
      </CardContent>
    </Card>
  );
};

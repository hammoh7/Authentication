"use client";

import { admin } from "@/activities/admin";
import { Role } from "@/components/auth/role";
import { FormSuccess } from "@/components/form-success";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { UserRole } from "@prisma/client";
import { toast } from "sonner";

const Admin = () => {
  const apiRoute = () => {
    fetch("/api/admin").then((response) => {
      if (response.ok) {
        toast.success("Allowed");
      } else {
        toast.error("Forbidden");
      }
    });
  };
  const serverAction = () => {
    admin().then((data) => {
      if (data.error) {
        toast.error(data.error);
      }
      if (data.success) {
        toast.success(data.success);
      }
    });
  };
  return (
    <Card className="w-[600px] shadow-lg bg-blue-200">
      <CardHeader className="truncate p-3 rounded-md">
        <p className="text-xl font-semibold text-center">Admin</p>
      </CardHeader>
      <CardContent className="space-y-3">
        <Role allowedRole={UserRole.ADMIN}>
          <FormSuccess message="Access Granted!" />
        </Role>
        <div className="flex flex-row items-center justify-between rounded-lg border p-2 shadow-md bg-white">
          <p className="text-sm font-medium">API Route</p>
          <Button onClick={apiRoute}>Click to test</Button>
        </div>
        <div className="flex flex-row items-center justify-between rounded-lg border p-2 shadow-md bg-white">
          <p className="text-sm font-medium">Server Actions</p>
          <Button onClick={serverAction}>Click to test</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default Admin;

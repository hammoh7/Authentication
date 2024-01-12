"use client";

import { GitHub, Google, Microsoft } from "@mui/icons-material";
import { Button } from "../ui/button";

export const SocialIcons = () => {
  return (
    <div className="flex items-center w-full gap-x-3">
      <Button size="lg" className="w-full" variant="outline" onClick={() => {}}>
        <Google className="h-5 w-5 " />
      </Button>
      <Button size="lg" className="w-full" variant="outline" onClick={() => {}}>
        <GitHub className="h-5 w-5 " />
      </Button>
      <Button size="lg" className="w-full" variant="outline" onClick={() => {}}>
        <Microsoft className="h-5 w-5 " />
      </Button>
    </div>
  );
};

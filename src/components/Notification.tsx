import { Bell } from "lucide-react";
import React from "react";
import { Button } from "./ui/button";

const Notification = () => {
  return (
    <div>
      <Button variant="ghost" className="rounded-full" size="icon">
        <Bell />
      </Button>
    </div>
  );
};

export default Notification;

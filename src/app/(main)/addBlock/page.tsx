"use client";
import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import DynamicForm from "@/components/DynamicForm";

const Page = () => {
  const [dataType, setDataType] = useState<string>("");

  const handleSelectChange = (value: string) => {
    setDataType(value);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-4">Add Block</h1>
      <div className="grid grid-cols-12">
        <div className="col-span-10">
          <DynamicForm dataType={dataType} />
        </div>
        <div className="col-span-2">
          <h2 className="text-md font-bold mb-4">Select Data Type</h2>
          <Select value={dataType} onValueChange={handleSelectChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Data Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="university">University</SelectItem>
                <SelectItem value="bank">Bank</SelectItem>
                <SelectItem value="business">Business</SelectItem>
                <SelectItem value="property">Property</SelectItem>
                <SelectItem value="home">Home</SelectItem>
                <SelectItem value="marriage">Marriage</SelectItem>
                <SelectItem value="personal">Personal</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default Page;

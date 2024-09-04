import React from "react";
import { useForm, Controller } from "react-hook-form";
import { Select, SelectTrigger } from "./ui/select";
// Import other form components similarly

interface FormData {
  dataType: string;
  // Add other generic form fields if needed
}

const DynamicForm = ({ dataType }: FormData) => {
  console.log(dataType);

  const { control, handleSubmit, reset, watch } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    // Handle form submission
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-4">Add Data</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Select {dataType}
          </label>
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default DynamicForm;

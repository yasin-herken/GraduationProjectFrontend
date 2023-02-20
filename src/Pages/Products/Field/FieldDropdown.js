import React from "react";
import { Controller } from "react-hook-form";
import { convertFirstLetterToUppercase } from "../../../Utils/uppercase";
import { Dropdown } from "primereact/dropdown";
import { getFormErrorMessage } from "../../../Utils/getFormErrorMessage";
const FieldDropdown = (props) => {
  return (
    <Controller
      name={props?.name}
      control={props?.control}
      render={({ field }) => {
        return (
          <>
            <label htmlFor={field.name} className="form-label">
              {convertFirstLetterToUppercase(field.name)}
            </label>
            <Dropdown
              id={field.name}
              value={field.value}
              optionLabel="name"
              placeholder={props?.placeholder}
              name={props?.name}
              options={props?.options}
              control={props?.control}
              onChange={(e) => field.onChange(e.value)}
              className={`p-inputtext-sm w-100 ${
                props.errors[props?.name] && "p-invalid"
              }`}
            />

            {getFormErrorMessage(props?.errors, field.name)}
          </>
        );
      }}
    />
  );
};

export default FieldDropdown;

import { InputNumber } from "primereact/inputnumber";
import { classNames } from "primereact/utils";
import React from "react";
import { Controller } from "react-hook-form";
import { getFormErrorMessage } from "../../../Utils/getFormErrorMessage";
import { convertFirstLetterToUppercase } from "../../../Utils/uppercase";

const FieldNumber = (props) => {
  return (
    <Controller
      name={props?.name}
      control={props?.control}
      render={({ field, fieldState }) => (
        <>
          <label htmlFor={field.name} className="form-label">
            {convertFirstLetterToUppercase(field.name)}
          </label>
          <InputNumber
            inputRef={field.ref}
            id={field.name}
            value={field.value}
            onBlur={field.onBlur}
            onValueChange={(e) => field.onChange(e)}
            mode={props?.mode}
            currency={props?.currency}
            locale={props?.locale}
            className={`p-inputtext-sm w-100 ${
              props.errors[props?.name] && "p-invalid"
            }`}
          />
          {getFormErrorMessage(props?.errors, field.name)}
        </>
      )}
    />
  );
};

export default FieldNumber;

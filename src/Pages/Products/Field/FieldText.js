import {InputText} from "primereact/inputtext";
import React from "react";
import {getFormErrorMessage} from "../../../Utils/getFormErrorMessage";
import {convertFirstLetterToUppercase} from "../../../Utils/uppercase";
import {Controller} from "react-hook-form";

const FieldText = (props) => {
  return (
    <>
      <label htmlFor={props?.name} className="form-label">
        {convertFirstLetterToUppercase(props?.name + "")}
      </label>
      <Controller
        name={props?.name}
        control={props?.control}
        render={({field, fieldState: {error}}) => {
          return (
            <InputText
              disabled={props?.disabled ? props?.disabled : false}
              id={field.name}
              value={field.value}
              onBlur={field.onBlur}
              onChange={(e) => {
                field.onChange(e.target.value);
              }}
              className={`p-inputtext-sm w-100 ${
                error && "p-invalid"
              }`}
            />
          );
        }}
      />
      {!props.disabled && getFormErrorMessage(props?.errors, props?.name)}
    </>
  );
};

export default FieldText;

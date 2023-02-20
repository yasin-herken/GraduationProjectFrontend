import { InputText } from "primereact/inputtext";
import React from "react";
import { getFormErrorMessage } from "../../../Utils/getFormErrorMessage";
import { convertFirstLetterToUppercase } from "../../../Utils/uppercase";

const FieldText = (props) => {
  return (
    <>
      <label htmlFor={props?.name} className="form-label">
        {convertFirstLetterToUppercase(props?.name + "")}
      </label>
      <InputText
        name={props?.name}
        {...props?.register(props?.name)}
        className={`p-inputtext-sm form-control ${
          props.errors[props?.name] && "p-invalid"
        }`}
      />
      {getFormErrorMessage(props?.errors, props?.name)}
    </>
  );
};

export default FieldText;

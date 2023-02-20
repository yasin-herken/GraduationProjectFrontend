import { InputText } from "primereact/inputtext";
import React from "react";
import { convertFirstLetterToUppercase } from "../../../Utils/uppercase";

const FieldItemofArray = (props) => {
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
      <div className="invalid-feedback" style={{ display: "block" }}>
       {props?.errors[props?.name]?.message}
      </div>
    </>
  );
};

export default FieldItemofArray;

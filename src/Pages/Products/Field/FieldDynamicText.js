import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import React from "react";
import { getFormErrorMessage } from "../../../Utils/getFormErrorMessage";
import { convertFirstLetterToUppercase } from "../../../Utils/uppercase";

const FieldDynamicText = (props) => {
  return (
    <>
      <label htmlFor={props?.name} className="form-label">
        {convertFirstLetterToUppercase(props?.name + "")}
      </label>
      <div className="p-inputgroup">
        <Button
          icon="pi pi-times"
          className="p-button-danger"
          onClick={props?.removeImages}
        />
        <InputText
          name={props?.name}
          {...props?.register(props?.name)}
          className={`p-inputtext-sm form-control ${
            props.errors[props?.name] && "p-invalid"
          }`}
        />
        <Button
          icon="pi pi-plus"
          className="p-button-success"
          onClick={props?.addImages}
        />
      </div>
      {getFormErrorMessage(props?.errors, props?.name)}
    </>
  );
};

export default FieldDynamicText;

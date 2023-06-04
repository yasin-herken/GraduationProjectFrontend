import {InputNumber} from "primereact/inputnumber";
import React from "react";
import {Controller} from "react-hook-form";
import {convertFirstLetterToUppercase} from "../../../Utils/uppercase";

const FieldNumber = (props) => {
  return (
    <Controller
      key={props?.name}
      control={props?.control}
      render={({field, fieldState: {error}}) => {
        console.log(error);
        return (
          <>
            <label htmlFor={field.name} className="form-label">
              {convertFirstLetterToUppercase(field.name)}
            </label>
            <InputNumber
              id={field.name}
              inputRef={field.ref}
              value={field.value}
              onBlur={field.onBlur}
              onChange={(e) => {
                field.onChange(e.value);
              }}
              mode={props?.mode}
              locale={props?.locale}
              currency={props?.currency}
              useGrouping={false}

              className={`p-inputtext-sm w-100 ${error && "p-invalid"}`}
            />
            {error ? <div className="invalid-feedback" style={{display: "block"}}>
                {error?.message}
              </div>
              :
              <div className="invalid-feedback" style={{display: "block"}}>
                &nbsp;
              </div>}
          </>
        );
      }}
      name={props?.name}
    />
  );
};

export default FieldNumber;

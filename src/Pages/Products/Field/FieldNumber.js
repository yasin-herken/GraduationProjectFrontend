import {InputNumber} from "primereact/inputnumber";
import React from "react";
import {Controller} from "react-hook-form";
import {getFormErrorMessage} from "../../../Utils/getFormErrorMessage";
import {convertFirstLetterToUppercase} from "../../../Utils/uppercase";

const FieldNumber = (props) => {
    return (
        <Controller
            key={props?.name}
            control={props?.control}
            render={({field, fieldState}) => {
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

                            className={`p-inputtext-sm w-100 ${
                                props.errors[props?.name] && "p-invalid"
                            }`}
                        />
                        {getFormErrorMessage(props?.errors, field.name)}
                    </>
                );
            }}
            name={props?.name}
        />
    );
};

export default FieldNumber;

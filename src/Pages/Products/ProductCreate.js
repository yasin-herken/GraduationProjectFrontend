import React, { useContext, useEffect, useState } from "react";
import { Card } from "primereact/card";
import { Divider } from "primereact/divider";
import { useFieldArray, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { LanguageContext } from "../../Context/LanguageContext";
import * as yup from "yup";
import FieldText from "./Field/FieldText";
import FieldNumber from "./Field/FieldNumber";
import FieldDropdown from "./Field/FieldDropdown";
import { InputText } from "primereact/inputtext";
import { convertFirstLetterToUppercase } from "../../Utils/uppercase";
import { getCategories } from "./Services/categoryService";
const imageSchema = yup.object().shape({
  url: yup.string().required("Image URL is required"),
});

const schema = yup
  .object({
    title: yup.string().required("Product title is required"),
    description: yup.string().required("Product description is required"),
    stock: yup
      .number()
      .typeError("Stock must be a number")
      .required("Product stock is required"),
    price: yup
      .number()
      .typeError("Price must be a number")
      .required("Product price is required"),
    category: yup.string().required("Product category is required"),
    numberOfImages: yup.object().required("Number of images is required"),
    images: yup.array().of(imageSchema),
  })
  .required();
const ProductCreate = () => {
  const { provider } = useContext(LanguageContext);
  const [categories, setCategories] = useState([]);
  const [images, setImages] = useState([0]);

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const { fields, append, remove } = useFieldArray({
    name: "images",
    control,
  });

  const numberOfImages = watch("numberOfImages");

  const onSubmit = (data) => {
    console.log(data);
  };
  useEffect(() => {
    console.log(categories);
  }, [categories]);
  useEffect(() => {
    console.log(errors);
  }, [errors]);
  useEffect(() => {
    // update field array when ticket number changed

    const newVal = parseInt(numberOfImages?.name || 0);
    const oldVal = fields.length;

    console.log(newVal, oldVal);
    if (newVal > oldVal) {
      // append tickets to field array
      for (let i = oldVal; i < newVal; i++) {
        append({ url: "" });
      }
    } else {
      // remove tickets from field array
      for (let i = oldVal; i > newVal; i--) {
        remove(i - 1);
      }
    }
  }, [numberOfImages]);
  useEffect(() => {
    const getCategoriesArray = async () => {
      const data = await getCategories();
      console.log(data);
      const categories = data.map((category) => ({
        name: category.name,
        code: category.name,
      }));
      setCategories(categories);
    };
    getCategoriesArray();
  }, []);
  return (
    <React.Fragment>
      <div className="mb-3">
        <h1>Product</h1>
      </div>

      <Card>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="row">
            <div className="col-md-4 col-sm-6">
              <FieldText name="title" register={register} errors={errors} />
            </div>
            <div className="col-md-4 col-sm-6">
              <FieldText
                name="description"
                register={register}
                errors={errors}
              />
            </div>
            <div className="col-md-4 col-sm-6">
              <FieldNumber
                name="stock"
                register={register}
                errors={errors}
                control={control}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-4 col-sm-6">
              <FieldNumber
                name="price"
                register={register}
                errors={errors}
                control={control}
                mode="currency"
                currency="USD"
                locale="en-US"
              />
            </div>
            <div className="col-md-4 col-sm-6">
              <FieldDropdown
                name="category"
                register={register}
                errors={errors}
                control={control}
                options={categories}
                placeholder="Select a category"
              />
            </div>
            <div className="col-md-4 col-sm-6">
              <FieldDropdown
                name="numberOfImages"
                register={register}
                errors={errors}
                control={control}
                options={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => {
                  return {
                    name: i + "",
                    code: i + "",
                  };
                })}
                placeholder="Select a number of images"
              />
            </div>
          </div>
          <Divider />
          <div className="row">
            {fields.map((item, i) => (
              <div className="col-md-4 col-sm-6">
                <label htmlFor={"images" + i} className="form-label">
                  {convertFirstLetterToUppercase(`Image ${i + 1}`)}
                </label>
                <InputText
                  key={i}
                  name={`images[${i}].url`}
                  {...register(`images.[${i}].url`)}
                  className={`p-inputtext-sm form-control ${
                    errors.images?.[i]?.url && "p-invalid"
                  }`}
                />
                <div className="invalid-feedback" style={{ display: "block" }}>
                  {errors.images?.[i]?.url?.message}
                </div>
              </div>
            ))}
          </div>
          <button>
            <i className="pi pi-save"></i> Save
          </button>
        </form>
      </Card>
    </React.Fragment>
  );
};

export default ProductCreate;

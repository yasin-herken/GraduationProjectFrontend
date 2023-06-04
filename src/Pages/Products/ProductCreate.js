import React, {useEffect, useState} from "react";
import {useFieldArray, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import FieldText from "./Field/FieldText";
import {getCategories} from "./Services/categoryService";
import {useLocation, useNavigate} from "react-router-dom";
import {getProduct, postProduct, putProduct} from "../../Services/productServices";
import {toast, ToastContainer} from "react-toastify";
import FieldNumber from "./Field/FieldNumber";
import FieldDropdown from "./Field/FieldDropdown";
import {convertFirstLetterToUppercase} from "../../Utils/uppercase";
import {InputText} from "primereact/inputtext";
import {Button} from "primereact/button";
import {Color} from "../../Common/Color";
import {Size} from "../../Common/Size";
import {Divider} from "primereact/divider";
import {Card} from "primereact/card";
import {Gender} from "../../Common/Gender";

const imageSchema = yup.object().shape({
  url: yup.string().required("Image URL is required"),
});

const schema = yup
  .object({
    title: yup.string().required("Product title is required"),
    description: yup.string().required("Product description is required"),
    stock: yup
      .number()
      .typeError("Product stock must be a number")
      .required("Product stock is required")
      .min(1, "Product stock must be greater than 0"),
    price: yup
      .number()
      .typeError("Price must be a number")
      .moreThan(0, "Price must be greater than 0")
      .required("Price is required"),
    numberOfImages: yup
      .object()
      .shape({
        name: yup.string().required("Number of images is required"),
        code: yup.string().required("Number of images is required"),
      })
      .required("Number of images is required"),
    images: yup.array().of(imageSchema),
    color: yup.object()
      .shape({
        name: yup.string().required("Product size is required"),
        code: yup.string().required("Product size is required"),
      })
      .required("Product size is required"),
    gender: yup
      .object()
      .shape({
        name: yup.string().required("Gender is required"),
        code: yup.string().required("Gender is required"),
      })
      .required("Gender is required"),
    size: yup
      .object()
      .shape({
        name: yup.string().required("Product size is required"),
        code: yup.string().required("Product size is required"),
      })
      .required("Product size is required"),
    category: yup
      .object()
      .shape({
        name: yup.string().required("Product category is required"),
        code: yup.string().required("Product category is required"),
      })
      .required("Product category is required"),
  })
  .required()
const ProductCreate = () => {
  const [categories, setCategories] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const updateOrAdd = location.pathname.split("/")[2] !== "new" ? "Update" : "Add";
  const {
    register, handleSubmit, control, watch, reset, formState: {errors},
  } = useForm({
    resolver: yupResolver(schema),
  });
  const {fields, append, remove} = useFieldArray({
    name: "images", control,
  });

  const numberOfImages = watch("numberOfImages");

  const onSubmit = async (formData) => {
    const data = {
      title: formData.title,
      description: formData.description,
      stock: formData.stock,
      price: {
        price: formData.price, currency: "$",
      },
      images: formData.images.map((image) => image.url),
      color: formData.color.name,
      size: formData.size.name,
      category: {
        name: formData.category.name,
      },
      gender: formData.gender.name
    };
    if (updateOrAdd === "Update") {
      try {
        const res = await putProduct(location.pathname.split("/")[2], data);
        toast("Product updated successfully");
        await new Promise((resolve) => setTimeout(resolve, 3000));
        navigate("/products");
      } catch (err) {
        toast.error(err.response.data.message);
      }
    } else {
      try {
        const res = await postProduct(data);
        toast("Product added successfully");
        await new Promise((resolve) => setTimeout(resolve, 3000));
        navigate("/products");
      } catch (err) {
        console.log(err);
        toast.error(err.response.data.message);
      }
    }
  };
  useEffect(() => {
    // update field array when ticket number changed
    const newVal = parseInt(numberOfImages?.name || 0);
    const oldVal = fields.length;

    console.log(newVal, oldVal);
    if (newVal > oldVal) {
      // append tickets to field array
      for (let i = oldVal; i < newVal; i++) {
        append({url: ""});
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
      const categories = data?.map((category) => ({
        name: category.name, code: category.name,
      }));
      setCategories(categories);
    };
    const getProductData = async (id) => {
      const data = await getProduct(id);
      reset({
        title: data.title,
        description: data.description,
        stock: parseInt(data.stock),
        price: data.price.price,
        category: {
          name: data.category.name, code: data.category.name,
        },
        color: {
          name: data.color, code: data.color
        },
        size: {
          name: data.size, code: data.size,
        },
        numberOfImages: {
          name: data.images.length + "", code: data.images.length + "",
        },
        images: data.images.map((image) => ({
          url: image.url,
        })),
        gender: data.gender
      });
    };
    if (location.pathname.split("/") && location.pathname.split("/")[2] !== "new") {
      getProductData(location.pathname.split("/")[2]);
    }
    getCategoriesArray();
  }, [location.pathname, reset]);

  return (<React.Fragment>
    <div className="mb-3">
      <h1>Product</h1>
    </div>

    <Card>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="row">
          <div className="col-md-4 col-sm-6">
            <FieldText name="title" register={register} errors={errors} control={control}/>
          </div>
          <div className="col-md-4 col-sm-6">
            <FieldText
              name="description"
              register={register}
              errors={errors}
              control={control}
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
              control={control}
              options={categories}
              placeholder="Select a category"
            />
          </div>
          <div className="col-md-4 col-sm-6">
            <FieldDropdown
              name="color"
              register={register}
              control={control}
              options={Object.keys(Color).map((color) => {
                return {
                  name: color, code: color,
                };
              })}
              placeholder="Select a color"
            />
          </div>
          <div className="col-md-4 col-sm-6">
            <FieldDropdown
              name="size"
              register={register}
              control={control}
              options={Object.keys(Size).map((size) => {
                return {
                  name: size, code: size,
                };
              })}
              placeholder="Select a color"
            />
          </div>
          <div className="col-md-4 col-sm-6">
            <FieldDropdown
              name="gender"
              register={register}
              control={control}
              options={Object.keys(Gender).map((gender) => {
                return {
                  name: gender, code: gender,
                };
              })}
              placeholder="Select a Gender"
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
                  name: i + "", code: i + "",
                };
              })}
              placeholder="Select a number of images"
            />
          </div>
        </div>
        <Divider/>
        <div className="row">
          {fields.map((item, i) => (<div className="col-md-4 col-sm-6" key={`div${i}`}>
            <label htmlFor={"images" + i} className="form-label">
              {convertFirstLetterToUppercase(`Image ${i + 1}`)}
            </label>
            <InputText
              name={`images[${i}].url`}
              {...register(`images.[${i}].url`)}
              className={`p-inputtext-sm form-control ${errors.images?.[i]?.url && "p-invalid"}`}
            />
            <div
              className="invalid-feedback"
              style={{display: "block"}}
              key={`images[${i}]errors`}
            >
              {errors.images?.[i]?.url?.message}
            </div>
          </div>))}
        </div>
        <div className="row">
          <div className="d-flex align-items-end justify-content-end">
            <Button label="Save" icon="pi pi-check" severity="secondary"/>
          </div>
        </div>
      </form>
    </Card>
    <ToastContainer
      position="top-center"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="dark"
    />
  </React.Fragment>);
};

export default ProductCreate;

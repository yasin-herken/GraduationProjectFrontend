import React, {useEffect} from "react";
import {useForm} from "react-hook-form";
import {getProductForOrder} from "../../Services/productServices";

import {Color} from "../../Common/Color";
import {Size} from "../../Common/Size";
import {Divider} from "primereact/divider";
import {Card} from "primereact/card";
import {Gender} from "../../Common/Gender";
import FieldNumber from "../Products/Field/FieldNumber";
import FieldText from "../Products/Field/FieldText";
import FieldDropdown from "../Products/Field/FieldDropdown";
import {useParams} from "react-router-dom";
import {convertFirstLetterToUppercase} from "../../Utils/uppercase";
import {InputText} from "primereact/inputtext";

const defaultValues = {
  title: "", description: "",
  stock: 0,
  price: 0,
  category: {
    name: "", code: "",
  }, color: {
    name: "", code: ""
  }, size: {
    name: "", code: "",
  }, numberOfImages: {
    name: "", code: "",
  }, images: [],
  gender: {
    name: "", code: "",
  }
}
const ProductView = () => {
  const params = useParams();
  const defaultProduct = React.useState(defaultValues);
  const [loading, setLoading] = React.useState(true);
  const [data, setData] = React.useState(null);
  const {register, errors, handleSubmit, reset, control} = useForm({
    defaultValues: defaultProduct
  })
  useEffect(() => {
    setLoading(true);
    const getProductData = async (id) => {
      const data = await getProductForOrder(id);
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
        gender: {
          name: data.gender,
          code: data.gender
        }
      });
      setLoading(false);
      setData(data)
    };
    getProductData(params.id);
  }, [params, reset]);

  return (<React.Fragment>
    <div className="mb-3">
      <h1>Product</h1>
    </div>

    {loading ? <div>Loading...</div> :
      <Card>
        <form onSubmit={handleSubmit(() => console.log("here"))}>
          <div className="row">
            <div className="col-md-4 col-sm-6">
              <FieldText
                name="title"
                register={register}
                errors={errors}
                control={control}
                disabled
              />
            </div>
            <div className="col-md-4 col-sm-6">
              <FieldText
                name="description"
                register={register}
                errors={errors}
                control={control}
                disabled
              />
            </div>
            <div className="col-md-4 col-sm-6">
              <FieldNumber
                name="stock"
                register={register}
                errors={errors}
                control={control}
                disabled
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
                disabled
              />
            </div>

            <div className="col-md-4 col-sm-6">
              <FieldDropdown
                name="category"
                register={register}
                control={control}
                optionDisabled
                placeholder="Select a category"
                disabled
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
                optionDisabled
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
                optionDisabled
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
                optionDisabled
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
                optionDisabled
              />
            </div>
          </div>
          <Divider/>
          <div className="row">
            {data?.images?.map((item, i) => (<div className="col-md-4 col-sm-6" key={`div${i}`}>
              <label htmlFor={"images" + i} className="form-label">
                {convertFirstLetterToUppercase(`Image ${i + 1}`)}
              </label>
              <InputText
                name={`images[${i}].url`}
                {...register(`images.[${i}].url`)}
                className={`p-inputtext-sm form-control`}
                disabled
              />
            </div>))}
          </div>
        </form>
      </Card>
    }
  </React.Fragment>);
};

export default ProductView;

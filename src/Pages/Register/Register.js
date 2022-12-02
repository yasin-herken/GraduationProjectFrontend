import React, { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { publicRequest } from "../../Requests/RequestMethods";
const schema = yup
  .object({
    email: yup.string().email().required("Email is required"),
    username: yup.string().required("Username is required"),
    password: yup.string().required("Password is required"),
  })
  .required();
const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const [error, setError] = useState({
    show: false,
    msg: "",
  });
  const onSubmit = async (object) => {
    try {
      const res = await publicRequest.post("/api/auth/signup", {
        email: object.email,
        username: object.username,
        password: object.password,
      });
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <main className="d-flex w-100">
      <div className="container d-flex flex-column">
        <div className="row vh-100">
          <div className="col-sm-10 col-md-8 col-lg-6 mx-auto d-table h-100">
            <div className="d-table-cell align-middle">
              <div className="text-center mt-4">
                <h1 className="h2">Get started</h1>
              </div>
              <div className="card">
                <div className="card-body">
                  <div className="m-sm-4">
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input
                          id={errors?.email ? "validationCustom03" : null}
                          className={`form-control form-control-lg ${
                            errors.email?.message ? "is-invalid" : null
                          }`}
                          type="text"
                          name="email"
                          placeholder="Enter your email"
                          {...register("email")}
                        />
                        <div className="invalid-feedback">
                          {errors.email?.message}
                        </div>
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Username</label>
                        <input
                          id={errors?.username ? "validationCustom03" : null}
                          className={`form-control form-control-lg ${
                            errors.username?.message ? "is-invalid" : null
                          }`}
                          type="text"
                          name="username"
                          placeholder="Enter your username"
                          {...register("username")}
                        />
                        <div className="invalid-feedback">
                          {errors.username?.message}
                        </div>
                        {error.show ? (
                          <div className="invalid-feedback">{error.msg}</div>
                        ) : null}
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Password</label>
                        <input
                          id={errors?.password ? "validationCustom03" : null}
                          className={`form-control form-control-lg ${
                            errors.password?.message ? "is-invalid" : null
                          }`}
                          type="password"
                          name="password"
                          placeholder="Enter password"
                          {...register("password")}
                        />
                        <div className="invalid-feedback">
                          {errors.password?.message}
                        </div>
                      </div>
                      <div className="text-center mt-3">
                        {/* <a href="index.html" className="btn btn-lg btn-primary">Sign up</a> */}
                        <input
                          type="submit"
                          className="btn btn-lg btn-primary"
                          value="Sign up"
                        />
                        <div className="text-center">
                          <span>If you have an account </span>
                          <a href="/login">Login {">"}</a>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Register;

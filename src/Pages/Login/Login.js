import React, { useState } from 'react'
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import "./css/Login.css";
import { publicRequest, userRequest } from '../../Requests/RequestMethods';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login, selectUser } from '../../Features/user/userSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const schema = yup.object({
    username: yup.string().required(
        "Username is required"
    ),
    password: yup.string().required("Password is required"),
}).required();
const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });
    const [error, setError] = useState({
        show: false,
        msg: "",
    });
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const onSubmit = async (object) => {
        try {
            const res = await publicRequest.post("/api/auth/signin", {
                username: object.username,
                password: object.password
            })
            if (res?.data?.token) {
                dispatch(login(res.data));
                navigate("/");
            }
        } catch (err) {
            console.log(err);
            toast.error(err.response.data.error);
        }
    }
    return (
        <React.Fragment>
            <main className="d-flex w-100">
                <div className="container d-flex flex-column">
                    <div className="row vh-100">
                        <div className="col-sm-10 col-md-8 col-lg-6 mx-auto d-table h-100">
                            <div className="d-table-cell align-middle">
                                <div className="text-center mt-4">
                                    <h1 className="h2">Welcome to the Graduation Project</h1>
                                    <p className="lead">
                                        Sign in to your account to continue
                                    </p>
                                </div>
                                <div className="card">
                                    <div className="card-body">
                                        <div className="m-sm-4">
                                            <form onSubmit={handleSubmit(onSubmit)}>
                                                <div className="mb-3">
                                                    <label className="form-label">Username</label>
                                                    <input id={errors?.username ? "validationCustom03" : null} className={`form-control form-control-lg ${errors.username?.message ? "is-invalid" : null}`} type="text" name="username" placeholder="Enter your Username" {...register("username")} />
                                                    <div className='invalid-feedback'>{errors.username?.message}</div>
                                                </div>
                                                <div className="mb-3">
                                                    <label className="form-label">Password</label>
                                                    <input id={errors?.password ? "validationCustom03" : null} className={`form-control form-control-lg ${errors.password?.message ? "is-invalid" : null}`} type="password" name="password" placeholder="Enter your password" {...register("password")} />
                                                    <div className='invalid-feedback'>{errors.password?.message}</div>
                                                    {error.show ? <div className='invalid-feedback'>{error.msg}</div> : null}
                                                    {/* <small>
                                                    <a href="index.html">Forgot password?</a>
                                                </small> */}
                                                </div>
                                                <div>
                                                    <label className="form-check">
                                                        <input className="form-check-input" type="checkbox" defaultValue="remember-me" name="remember-me" defaultChecked />
                                                        <span className="form-check-label">
                                                            Remember me next time
                                                        </span>
                                                    </label>
                                                </div>
                                                <div className="text-center mt-3">
                                                    {/* <a href="index.html" className="btn btn-lg btn-primary">Sign in</a> */}
                                                    <input type="submit" className="btn btn-lg btn-primary" value={"Sign in"} />
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
        </React.Fragment>
    )
}

export default Login
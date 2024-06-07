'use client';

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../redux/slices/userSlice";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

const styles = {
    contain: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 'auto',
        width: '100%',
        height: '100%'
    },
    card: {
        width: '22%',
        // height: '40%'
    },
    cardheader: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: '20px'
    },
    cardtitle: {
        fontWeight: 600
    },
    cardforget: {
        display: 'flex',
        justifyContent: 'flex-end',
        paddingBottom: '20px',
        color: '#3738e2',
        fontSize: '14px'
    },
    cardlinebox: {
        paddingTop: '10px'
    },
    cardline: {
        marginBottom: '20px',
        marginTop: '20px',
        textAlign: 'center',
        borderTop: '1px solid #404040'
    },
    cardline1: {
        marginTop: '20px',
        paddingTop: '5px',
        fontSize: '14px'
    },
    cardbtn: {
        width: '100%',
        backgroundColor: '#EDEDFC',
        color: '#3738e2',
        border: 'none',
        fontWeight: 550
    },
    cardlogin: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: '20px'
    }
};

export default function LoginPage() {
    const { register, handleSubmit, formState } = useForm();
    const { errors } = formState;
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const dispatch=useDispatch<ThunkDispatch<any, any, any>>();

    useEffect(() => {
        try{
            const isAuthenticated = JSON.parse(localStorage.getItem("user")??"");
            if(isAuthenticated){
                navigate("/dashboard")
            }
        } catch(e){
            
        }
        setLoading(false);
    }, []);

    const fields = {
        email: register('email', { required: 'Username is required' }),
        password: register('password', { required: 'Password is required' })
    };

    async function onSubmit({ email, password }) {
        let info_toast = toast.info("Logging in");
        try {
            await dispatch(loginUser({email,password})).unwrap()
            navigate("/dashboard")
            toast.dismiss(info_toast);
            toast.success("Logged in", { delay: 500 });
        } catch (e) {
            toast.dismiss(info_toast);
            toast.warning(e);
        }
    }

    if (loading) {
        return <div>Loading</div>;
    }

    return (
        <div style={{...styles.contain,...{display:"flex",height:"100vh",justifyContent:"center",alignItems:"center"}}}>
            <div style={styles.card}>
                <div style={styles.cardheader}>
                    <h4 style={styles.cardtitle}>Đăng nhập</h4>
                </div>
                <div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="mb-3">
                            <label className="form-label">Email</label>
                            <input {...fields.email} type="text" className={`form-control ${errors.email ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.email?.message?.toString()}</div>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Mật khẩu</label>
                            <input {...fields.password} type="password" className={`form-control ${errors.password ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.password?.message?.toString()}</div>
                        </div>
                        <div style={styles.cardforget}>
                            {/* <a href="/dashboard">Quên mật khẩu</a> */}
                        </div>
                        <button disabled={formState.isSubmitting} className="btn btn-primary w-100">
                            {formState.isSubmitting && <span className="spinner-border spinner-border-sm me-1"></span>}
                            Đăng nhập
                        </button>
                        <div style={styles.cardlinebox}>
                            <div style={styles.cardline}>
                                <p style={styles.cardline1}>Chưa có tài khoản? Vui lòng liên hệ quản trị dân cư.</p>
                            </div>
                            {/* <Button href="/signup" style={styles.cardbtn}>Tạo tài khoản mới</Button> */}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

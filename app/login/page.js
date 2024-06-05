"use client";
import React, { useState } from "react";
import Cookies from 'js-cookie';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { verifyToken } from "@/utils/auth";

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().min(6, "Too Short!").required("Required"),
});

const page = () => {
  const [error, setError] = useState(null);

  const handleSubmit = async (values) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (!res.ok) {
        throw new Error('Login failed');
      }

      const data = await res.json();
      console.log({data})
      const decodedToken = verifyToken(data.token);
      console.log({decodedToken})
      if (decodedToken) {
        Cookies.set('token', data.token);
        if (decodedToken.role === 'HR') {
          router.push('/dashboard/admin/createEvent');
        } else if (decodedToken.role === 'Vendor') {
          router.push('/dashboard/vendor/events');
        }
      }
    } catch (err) {
      setError(err.message);
    }
  };

  console.log({error})

  return (
    <div>
      <h1>Login</h1>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={LoginSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div>
              <label htmlFor="email">Email</label>
              <Field type="email" name="email" />
              <ErrorMessage name="email" component="div" />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <Field type="password" name="password" />
              <ErrorMessage name="password" component="div" />
            </div>
            {error && <div>{error}</div>}
            <button type="submit" disabled={isSubmitting}>
              Login
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default page;

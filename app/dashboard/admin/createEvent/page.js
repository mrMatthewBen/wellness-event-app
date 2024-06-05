"use client";

import React, { useEffect, useState } from "react";
import styles from "../../../page.module.css";
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import DatePicker from "react-datepicker";
import styled from "styled-components";
import axiosWithToken from "@/utils/fetchWithToken";

import "react-datepicker/dist/react-datepicker.css";
import "@/styles/formikStyle.css";

const FormSection = styled.div`
  display: flex;
  flex-direction: column;
`;

function page() {
  const [eventsRes, setEventsRes] = useState(null);
  const [companiesRes, setCompaniesRes] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const eventRes = await axiosWithToken.get(`/api/event`);
        const companyRes = await axiosWithToken.get(`/api/company`);
        setEventsRes(eventRes.data);
        setCompaniesRes(companyRes.data);
      } catch (error) {
        console.error(error);
      } finally {
        console.log("false");
      }
    };

    fetchData();
  }, []);

  console.log({ eventsRes, companiesRes }, "test bro");
  return (
    <main className={styles.main}>
      <div>
        <h1>Add new proposed_dates</h1>
        <Formik
          initialValues={{ company_id: "", location: "" }}
          validate={(values) => {
            const errors = {};
          }}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            try {
              const { company_id, event_id, proposed_dates, location } = values;
              const proposedDates = proposed_dates?.map((data) => data.date);
              const res = await axiosWithToken.post(`/api/wellness-events`, {
                company_id,
                event_id,
                proposed_dates: proposedDates,
                location,
              });

              resetForm();

              console.log({ res });
            } catch (error) {
              console.error("Error submitting form:", error);
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ isSubmitting, values, setFieldValue }) => (
            <Form>
              <FormSection>
                <label htmlFor="company_id">Company</label>
                <Field name="company_id" as="select">
                  {companiesRes?.map((data) => (
                    <option value={data.company_id}>{data.company_name}</option>
                  ))}
                </Field>
                <ErrorMessage name="company_id" component="div" />
              </FormSection>
              <FormSection>
                <label htmlFor="location">Location</label>
                <Field type="text" name="location" />
                <ErrorMessage name="location" component="div" />
              </FormSection>
              <FormSection>
                <label htmlFor="event_id">Event</label>
                <Field name="event_id" as="select">
                  {eventsRes?.map((data) => (
                    <option value={data.event_id}>{data.event_name}</option>
                  ))}
                </Field>
                <ErrorMessage name="event_id" component="div" />
              </FormSection>
              <FieldArray
                name="proposed_dates"
                render={(arrayHelpers) => (
                  <div>
                    <label>Proposed Dates</label>
                    {values?.proposed_dates &&
                    values.proposed_dates.length > 0 ? (
                      values?.proposed_dates?.map((proposedDate, index) => (
                        <div key={index}>
                          <DatePicker
                            selected={
                              (proposedDate.date &&
                                new Date(proposedDate.date)) ||
                              null
                            }
                            onChange={(date) =>
                              setFieldValue(
                                `proposed_dates[${index}].date`,
                                date,
                              )
                            }
                            dateFormat="yyyy/MM/dd"
                          />
                          <button
                            type="button"
                            onClick={() => arrayHelpers.remove(index)} // remove a friend from the list
                          >
                            -
                          </button>
                          <button
                            type="button"
                            onClick={() => arrayHelpers.insert(index, "")} // insert an empty string at a position
                          >
                            +
                          </button>
                        </div>
                      ))
                    ) : (
                      <button
                        type="button"
                        onClick={() => arrayHelpers.push("")}
                      >
                        {/* show this when user has removed all friends from the list */}
                        Add dates
                      </button>
                    )}
                  </div>
                )}
              />
              <button type="submit" disabled={isSubmitting}>
                Submit
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </main>
  );
}

export default page;

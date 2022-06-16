import React from 'react';
import {Formik} from 'formik';

const CustomFormikContainer = ({
  childern,
  initialValues,
  validationSchema,
  onSubmit,
}) => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}>
      {() => {
        return childern;
      }}
    </Formik>
  );
};

export default CustomFormikContainer;

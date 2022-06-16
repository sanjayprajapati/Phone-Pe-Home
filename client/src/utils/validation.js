validationSchema = yup.object({
  name: yup
    .string()
    .trim()
    .matches(nameRegExp, 'Name contain alphabets only')
    .min(4, 'Too short')

    .required('Name is Missing!'),
  email: yup.string().email('Invalid Email').required('Email is Missing!'),
  mobile: yup
    .string()
    .matches(phoneRegExp, 'Phone number is not valid')
    .required('Phone number is Missing!'),
  password: yup
    .string()
    .trim()
    .min(8, 'Password is too short')
    .required('Password is Missing!'),
  cpassword: yup.string().when('password', {
    is: val => (val && val.length > 0 ? true : false),
    then: yup
      .string()
      .oneOf([yup.ref('password')], 'Both password need to be the same'),
  }),
});

export default {
  email: {
    config: {
      label: 'Email',
      inputtype: 'input',
      type: 'text',
      placeholder: 'Email',
    },
    value: '',
    validation: {
      required: { value: true, msg: "This field is required" },
      minLength: { value: 4, msg: `Minimum character length is 4`}
    },
    touched: false,
  },
  password: {
    config: {
      label: 'Password',
      inputtype: 'input',
      type: 'text',
      placeholder: 'Password',
    },
    value: '',
    validation: {
      required: { value: true, msg: "This field is required" },
      minLength: { value: 6, msg: `Minimum character length is 4`}
    },
    touched: false,
  },
  confirmPassword: {
    config: {
      label: 'Confirm password',
      inputtype: 'input',
      type: 'text',
      placeholder: 'Confirm password',
    },
    value: '',
    validation: {
      required: { value: true, msg: "This field is required" },
      minLength: { value: 6, msg: `Minimum character length is 4`}
    },
    touched: false,
  },
  
}
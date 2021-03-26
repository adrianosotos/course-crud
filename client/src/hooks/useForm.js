import { useState } from 'react'
//import axios from 'axios'

function useForm(dataStruct, submitUrl, feedback) {
  const [values, setValues] = useState(dataStruct);
  const [errors, setErrors] = useState(dataStruct);

  function handleChange(e) {
    const { name, value } = e.target

    setValues({
      ...values,
      [name]: value
    })
  }

  function hasEmptyData() {
    return Object.values(values).some(data => !data)
  }

  function getEmpty(userData) {
    return Object.keys(userData).reduce((obj, data) => {
      if (!values[data]) {
        obj[data] = `Preenchimento obrigatorio`
      }
      return obj
    }, {})
  }

  function getEmptyFields() {
    setErrors({
      ...errors,
      ...getEmpty(values)
    })
  }

  function resetInputs() {
    setValues(dataStruct)
    setErrors(dataStruct)
  }

  function handleSubmit() {
    getEmptyFields()
    if (hasEmptyData()) {
      return alert(`Corrija os campos destacados`)
    }

    console.log(values)

  //   axios.post(submitUrl, {
  //       ...values
  //     })
  //     .then(function (response) {
  //       resetInputs()
  //       feedback('success')
  //     })
  //     .catch(function (error) {
  //       feedback('fail')
  //       console.log(error);
  //     });
  }

  return {
    handleChange,
    handleSubmit,
    values,
    errors
  }
}

export default useForm
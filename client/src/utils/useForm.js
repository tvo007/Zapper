import { useRef, useState} from 'react';

//useForm 2.0

/**
 * specs:
 * -be able to take in initial values
 * -decouple on submit and test
 * -what is useRef
 */

const useForm = (callback, initialState) => {
  const initial = useRef (initialState);
  const [formData, setFormData] = useState (initial);

  const onChange = event => {
    event.persist ();
    setFormData (formData => ({
      ...formData,
      [event.target.name]: event.target.value,
    }));
  };

  const onSubmit = event => {
    if (event) event.preventDefault ();
    callback()
    setFormData ({});
  };

  return {
    onChange,
    onSubmit,
    formData,
    setFormData
  };
};

//old version

// const useForm = callback => {
//   const [formData, setFormData] = useState ({});

//   const onSubmit = event => {
//     if (event) event.preventDefault ();
//     callback ();
//     setFormData ({});
//   };

//   const onSubmitFieldClear = event => {
//     if (event) event.preventDefault ();
//     callback ();
//     setFormData ({});
//   };

//   const onChange = event => {
//     event.persist ();
//     setFormData (formData => ({
//       ...formData,
//       [event.target.name]: event.target.value,
//     }));
//   };

//   return {
//     onChange,
//     onSubmit,
//     onSubmitFieldClear,
//     formData
//   };
// };

export default useForm;

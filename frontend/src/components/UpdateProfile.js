import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import UserService from "../services/user.service";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";



const UpdateProfile = () => {
  let history = useNavigate();
  const { id } = useParams();
  const { user: currentUser } = useSelector((state) => state.auth);
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState('');
  const [fromValue, setfromValue] = useState(null);
  const [user, setUser] = useState(null);

  const initialValues = {
    name: "",
    image: ""
  };

  const getData = async (id) => {
    const contentData = await UserService.getUsersDetails(id);
    setUser(contentData.data)
    setfromValue({
      name: contentData.data.name,
      image: contentData.data.image
    })
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("This field is required!"),
  });

  const updateHandler = async (formValue) => {
   
    const { name } = formValue;
    
    setSuccessful(false);
    try {
      const contentData = await UserService.updateUser({...user,name: name});
      if (contentData.status === 200) {
        setSuccessful(true);
        setMessage('Data save successfuly')
        history("/profile");
      }
    } catch (error) {
      setSuccessful(false);
    }

  };

  useEffect(() => {
    if (id) {
      getData(id)
    }
  }, [])

  return (
    <div className="col-md-12 signup-form">
      <div className="card card-container">

        <Formik
          initialValues={fromValue || initialValues}
          validationSchema={validationSchema}
          onSubmit={updateHandler}
          enableReinitialize={true}
        >
          <Form>
            {!successful && (
              <div>
                <div className="form-group">
                  <label htmlFor="name">name</label>
                  <Field name="name" type="text" className="form-control" />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="alert alert-danger"
                  />
                </div>

                <div className="form-group">
                  <button type="submit" className="btn btn-primary btn-block">Save</button>
                </div>
              </div>
            )}
          </Form>
        </Formik>
      </div>

      {message && (
        <div className="form-group">
          <div
            className={successful ? "alert alert-success" : "alert alert-danger"}
            role="alert"
          >
            {message}
          </div>
        </div>
      )}
    </div>
  );
};

export default UpdateProfile;

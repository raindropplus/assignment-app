import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import UserService from "../services/user.service";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";



const Content = () => {
  let history = useNavigate();
  const { id } = useParams();
  const { user: currentUser } = useSelector((state) => state.auth);
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState('');
  const [fromValue, setfromValue] = useState(null);

  const initialValues = {
    name: "",
    url: "",
    userId: "",
    image: ""
  };

  const getData = async (id) => {
    const contentData = await UserService.getContentById(id);

    setfromValue({
      name: contentData.data.name,
      url: contentData.data.url,
      userId: contentData.data.userId,
      image: contentData.data.image
    })
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("This field is required!"),
  });

  const createHandler = async (formValue) => {
    const { name, url } = formValue;
    const userId = currentUser.data.user._id;
    setSuccessful(false);
    try {
      if (id) {
        const contentData = await UserService.updateContent(id, name, userId, url);
        if (contentData.status === 200) {
          setSuccessful(true);
          setMessage('Data update successfuly');
        }
      } else {
        const contentData = await UserService.createContent(name, userId, url);
        if (contentData.status === 200) {
          setSuccessful(true);
          setMessage('Data save successfuly');
        }
      }
      history("/profile");

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
          onSubmit={createHandler}
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
                  <label htmlFor="url">Url</label>
                  <Field name="url" type="text" className="form-control" />
                  <ErrorMessage
                    name="url"
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

export default Content;

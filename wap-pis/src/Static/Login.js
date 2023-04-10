import { useState, useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const signInSchema = Yup.object().shape({
  email: Yup.string().email('Email musí mať platný formát').required("Email je povinný"),

  password: Yup.string()
    .required("Heslo je povinné")
});

const initialValues = {
  email: "",
  password: ""
};

const Login =() => {
    const navigate = useNavigate();
    
    // TODO TU SA BUDE POSIELAT DOTAZ NA BE CEZ LOGIN API - dorobiť ak bol login dobrý tak do localstoragu uložit mail a rolu (customer, admin, employee), pokial bol login zlý tak dat uživatelovi nejako vedieť, že zadal neplatný mail alebo heslo
    function login(values){
      localStorage.setItem("email", values.email);
      localStorage.setItem("role", "admin");
      navigate("/", { replace: true });
    }

    return (
      <Formik
      initialValues={initialValues}
      validationSchema={signInSchema}
      onSubmit={(values) => {
        login(values);
      }}
    >
    {(formik) => {
      const { errors, touched, isValid, dirty } = formik;
      return (
      <div className="backgroundImageCVR">
      <div className="background-image"></div>

        <section class="vh-100 gradient-custom"  className="rel">
          <div class="container py-5 h-100">
            <div class="row d-flex justify-content-center align-items-center h-100">
              <div class="col-12 col-md-8 col-lg-6 col-xl-5">
                <div class="card bg-dark text-white" style={{borderRadius: "1rem"}}>
                  <div class="card-body p-5 text-center">

                    <Form class="mb-md-5 mt-md-4 pb-5">

                      <h2 class="fw-bold mb-2 text-uppercase">Prihlásiť</h2>
                      <p class="text-white-50 mb-5">Prosím vyplňte email a heslo!</p>
                     
                      <div class="form-outline form-white mb-4">
                        <ErrorMessage name="email" component="span" className="error" />
                        <Field type="email" name="email" id="typeEmailX" class="form-control form-control-lg"
                        className={errors.email && touched.email ? 
                          "form-control form-control-lg input-error" : "form-control form-control-lg"}/>
                        <label class="form-label" for="typeEmailX">Email</label>
                        
                      </div>
                      
                      <div class="form-outline form-white mb-4">
                        <ErrorMessage name="password" component="span" className="error" />
                        <Field type="password" name="password" id="typePasswordX" class="form-control form-control-lg" 
                        className={errors.password && touched.password ? 
                          "form-control form-control-lg input-error" : "form-control form-control-lg"}/>
                        <label class="form-label" for="typePasswordX">Heslo</label>
                        
                      </div>
                      
                      <button class="btn btn-outline-light btn-lg px-5" type="submit" disabled={!(dirty && isValid)}>Prihlásiť</button>

                      <div class="d-flex justify-content-center text-center mt-4 pt-1">
                        <a href="#!" class="text-white"><i class="fab fa-facebook-f fa-lg"></i></a>
                        <a href="#!" class="text-white"><i class="fab fa-twitter fa-lg mx-4 px-2"></i></a>
                        <a href="#!" class="text-white"><i class="fab fa-google fa-lg"></i></a>
                      </div>

                    </Form>

                    <div>
                      <p class="mb-0">Nemáte ešte účet? <p className="clickable" onClick={() => navigate("/register", { replace: true })}  >Zaregistrovať sa</p>
                      </p>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      )}}
      </Formik>
    );
  }
  
export default Login;
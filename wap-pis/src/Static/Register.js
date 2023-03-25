import { useState, useEffect, useContext, forwardRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from 'date-fns'
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const phoneRegExp = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/

const signInSchema = Yup.object().shape({
    email: Yup.string().email('Email musí mať platný formát').required("Email je povinný"),
  
    password: Yup.string()
      .required("Heslo je povinné")
      .min(6, "Heslo je moc krátke, minimálne 6 znakov"),

    retypePassword: Yup
      .string()
      .required('Zadajte heslo znovu.')
      .oneOf([Yup.ref('password')], 'heslá sa nezhodujú.'),

    firstName: Yup
      .string()
      .matches(/^[A-Za-z ]*$/, 'Povolené sú písmena bez diakritiky')
      .max(40),

    lastName: Yup
      .string()
      .matches(/^[A-Za-z ]*$/, 'Povolené sú písmena bez diakritiky')
      .max(40),

    address: Yup
      .string()
      .matches(/^[A-Za-z0-9 ]*$/, 'Povolené sú písmena bez diakritiky'),

    phoneNumber: Yup
      .string()
      .matches(phoneRegExp, 'Číslo nieje validné')
  });
  
  const initialValues = {
    email: "",
    password: "",
    retypePassword: "",
    firstName: "",
    lastName: "",
    address: "",
    phoneNumber:""
  };

const Register =() => {
    const navigate = useNavigate();
    const [startDate, setStartDate] = useState(new Date());
    const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
        <input class="form-control form-control-lg" onClick={onClick} ref={ref} value={format(startDate, "dd-MM-yyyy")}/>
      ));
    
    // TU SA BUDE POSIELAT DOTAZ NA BE CEZ LOGIN API
    function register(values){
      console.log(values)
      console.log(startDate)
    }

    return (
    <Formik
      initialValues={initialValues}
      validationSchema={signInSchema}
      onSubmit={(values) => {
        register(values);
      }}
    >
    {(formik) => {
        const { errors, touched, isValid, dirty } = formik;
        return (
    <div className="backgroundImageCVR">
      <div className="background-image"></div>
        <section class="min-vh-100 gradient-custom" className="rel">
          <div class="container py-5 h-100">
            <div class="row d-flex justify-content-center align-items-center h-100">
              <div class="col-10 ">
                <div class="card bg-dark text-white" style={{borderRadius: "1rem"}}>
                  <div class="card-body p-5 text-center">

                    <Form class="mb-md-5 mt-md-4 pb-5">
                      <h2 class="fw-bold mb-2 text-uppercase">Registrácia</h2>
                      <div class="row">
                        <div class="form-outline form-white mb-4 col-sm-12 col-md-6">
                            <ErrorMessage name="firstName" component="span" className="error" />
                            <Field type="text" name="firstName" id="typeEmailX" class="form-control form-control-lg"
                            className={errors.firstName && touched.firstName ? 
                                "form-control form-control-lg input-error" : "form-control form-control-lg"}/>
                            <label class="form-label" for="typeEmailX">Meno</label>
                            
                        </div>
                        
                        <div class="form-outline form-white mb-4  col-sm-12 col-md-6" >
                            <ErrorMessage name="lastName" component="span" className="error" />
                            <Field type="text" name="lastName" id="typePasswordX" class="form-control form-control-lg" 
                            className={errors.lastName && touched.lastName ? 
                                "form-control form-control-lg input-error" : "form-control form-control-lg"}/>
                            <label class="form-label" for="typePasswordX">Priezvisko</label>
                            
                        </div>
                      </div>

                      <div class="row">
                        <div class="form-outline form-white mb-4 col-sm-12 col-md-6">
                            <ErrorMessage name="address" component="span" className="error" />
                            <Field type="text" name="address" id="typeEmailX" class="form-control form-control-lg"
                            className={errors.address && touched.address ? 
                                "form-control form-control-lg input-error" : "form-control form-control-lg"}/>
                            <label class="form-label" for="typeEmailX">Adresa</label>
                            
                        </div>
                        
                        <div class="form-outline form-white mb-4  col-sm-12 col-md-6" >
                            <ErrorMessage name="email" component="span" className="error" />
                            <Field type="email" name="email" id="typePasswordX" class="form-control form-control-lg" 
                            className={errors.email && touched.email ? 
                                "form-control form-control-lg input-error" : "form-control form-control-lg"}/>
                            <label class="form-label" for="typePasswordX">Email*</label>
                            
                        </div>
                      </div>

                      <div class="row">
                        <div class="form-outline form-white mb-4 col-sm-12 col-md-6">
                            <ErrorMessage name="phoneNumber" component="span" className="error" />
                            <Field type="text" name="phoneNumber" id="typeEmailX" class="form-control form-control-lg"
                            className={errors.phoneNumber && touched.phoneNumber ? 
                                "form-control form-control-lg input-error" : "form-control form-control-lg"}/>
                            <label class="form-label" for="typeEmailX">Telefón</label>
                            
                        </div>
                        
                        <div class="form-outline form-white mb-4  col-sm-12 col-md-6" >
                        <DatePicker selected={startDate} onChange={(date) => setStartDate(date)}
                        customInput={<ExampleCustomInput />} showYearDropdown/>
                            <label class="form-label" for="typePasswordX">Dátum narodenia</label>
                            
                        </div>
                      </div>

                      <div class="row">
                        <div class="form-outline form-white mb-4 col-sm-12 col-md-6">
                            <ErrorMessage name="password" component="span" className="error" />
                            <Field type="password" name="password" id="typeEmailX" class="form-control form-control-lg"
                            className={errors.password && touched.password ? 
                                "form-control form-control-lg input-error" : "form-control form-control-lg"}/>
                            <label class="form-label" for="typeEmailX">Heslo*</label>
                            
                        </div>
                        
                        <div class="form-outline form-white mb-4  col-sm-12 col-md-6" >
                            <ErrorMessage name="retypePassword" component="span" className="error" />
                            <Field type="password" name="retypePassword" id="typePasswordX" class="form-control form-control-lg" 
                            className={errors.retypePassword && touched.retypePassword ? 
                                "form-control form-control-lg input-error" : "form-control form-control-lg"}/>
                            <label class="form-label" for="typePasswordX">Znova heslo*</label>
                            
                        </div>
                      </div>


                      <button class="btn btn-outline-light btn-lg px-5" type="submit" disabled={!(dirty && isValid)}>Zaregistrovať sa</button>

                      
                    </Form>

             

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
  
export default Register;
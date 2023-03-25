import { useState, useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";


const initialValues = {
  email: "",
  password: ""
};

const Register =() => {
    const navigate = useNavigate();
    
    // TU SA BUDE POSIELAT DOTAZ NA BE CEZ LOGIN API
    function login(values){
      localStorage.setItem("email", values.email);
      localStorage.setItem("role", "customer");
      navigate("/", { replace: true });
    }

    return (
    <div className="backgroundImageCVR">
      <div className="background-image"></div>
        <section class="min-vh-100 gradient-custom" className="rel">
          <div class="container py-5 h-100">
            <div class="row d-flex justify-content-center align-items-center h-100">
              <div class="col-10 ">
                <div class="card bg-dark text-white" style={{borderRadius: "1rem"}}>
                  <div class="card-body p-5 text-center">

                    <form class="mb-md-5 mt-md-4 pb-5">
                      <h2 class="fw-bold mb-2 text-uppercase">Registrácia</h2>
                      <div class="row">
                        <div class="form-outline form-white mb-4 col-sm-12 col-md-6">
                            <input type="text" name="email" id="typeEmailX" class="form-control form-control-lg"/>
                            <label class="form-label" for="typeEmailX">Meno</label>
                            
                        </div>
                        
                        <div class="form-outline form-white mb-4  col-sm-12 col-md-6" >
                            <input type="text" name="password" id="typePasswordX" class="form-control form-control-lg" />
                            <label class="form-label" for="typePasswordX">Priezvisko</label>
                            
                        </div>
                      </div>

                      <div class="row">
                        <div class="form-outline form-white mb-4 col-sm-12 col-md-6">
                            <input type="text" name="email" id="typeEmailX" class="form-control form-control-lg"/>
                            <label class="form-label" for="typeEmailX">Adresa</label>
                            
                        </div>
                        
                        <div class="form-outline form-white mb-4  col-sm-12 col-md-6" >
                            <input type="text" name="password" id="typePasswordX" class="form-control form-control-lg" />
                            <label class="form-label" for="typePasswordX">Email</label>
                            
                        </div>
                      </div>

                      <div class="row">
                        <div class="form-outline form-white mb-4 col-sm-12 col-md-6">
                            <input type="text" name="email" id="typeEmailX" class="form-control form-control-lg"/>
                            <label class="form-label" for="typeEmailX">Telefón</label>
                            
                        </div>
                        
                        <div class="form-outline form-white mb-4  col-sm-12 col-md-6" >
                            <input type="text" name="password" id="typePasswordX" class="form-control form-control-lg" />
                            <label class="form-label" for="typePasswordX">Dátum narodenia</label>
                            
                        </div>
                      </div>

                      <div class="row">
                        <div class="form-outline form-white mb-4 col-sm-12 col-md-6">
                            <input type="text" name="email" id="typeEmailX" class="form-control form-control-lg"/>
                            <label class="form-label" for="typeEmailX">Heslo</label>
                            
                        </div>
                        
                        <div class="form-outline form-white mb-4  col-sm-12 col-md-6" >
                            <input type="text" name="password" id="typePasswordX" class="form-control form-control-lg" />
                            <label class="form-label" for="typePasswordX">Znova heslo</label>
                            
                        </div>
                      </div>


                      <button class="btn btn-outline-light btn-lg px-5" type="submit">Zaregistrovať sa</button>

                      
                    </form>

             

                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
  
export default Register;
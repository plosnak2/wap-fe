import { useState, useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function Login() {
    const navigate = useNavigate();
    const[email, setEmail] = useState('')
    const[password, setPassword] = useState('')

    function login(){
      // tu sa bude posielat dotaz na API na BE
      localStorage.setItem("email", email);
      localStorage.setItem("role", "customer");
      navigate("/", { replace: true });
    }

    return (
      <div className="rel">
      <div className="bg-image"></div>
      <div className="abs">
        <section class="vh-100 gradient-custom">
          <div class="container py-5 h-100">
            <div class="row d-flex justify-content-center align-items-center h-100">
              <div class="col-12 col-md-8 col-lg-6 col-xl-5">
                <div class="card bg-dark text-white" style={{borderRadius: "1rem"}}>
                  <div class="card-body p-5 text-center">

                    <div class="mb-md-5 mt-md-4 pb-5">

                      <h2 class="fw-bold mb-2 text-uppercase">Prihlásiť</h2>
                      <p class="text-white-50 mb-5">Prosím vyplňte email a heslo!</p>

                      <div class="form-outline form-white mb-4">
                        <input type="email" id="typeEmailX" class="form-control form-control-lg" value={email} onChange={(e) => setEmail(e.target.value)}/>
                        <label class="form-label" for="typeEmailX">Email</label>
                      </div>

                      <div class="form-outline form-white mb-4">
                        <input type="password" id="typePasswordX" class="form-control form-control-lg" value={password} onChange={(e) => setPassword(e.target.value)}/>
                        <label class="form-label" for="typePasswordX">Heslo</label>
                      </div>
                      
                      <button class="btn btn-outline-light btn-lg px-5" onClick={() => login()}>Prihlásiť</button>

                      <div class="d-flex justify-content-center text-center mt-4 pt-1">
                        <a href="#!" class="text-white"><i class="fab fa-facebook-f fa-lg"></i></a>
                        <a href="#!" class="text-white"><i class="fab fa-twitter fa-lg mx-4 px-2"></i></a>
                        <a href="#!" class="text-white"><i class="fab fa-google fa-lg"></i></a>
                      </div>

                    </div>

                    <div>
                      <p class="mb-0">Nemáte ešte účet? <a href="#!" class="text-white-50 fw-bold">Zaregistrovať sa</a>
                      </p>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      </div>
    );
  }
  
export default Login;
import { Link } from "react-router-dom";
import "./index.css";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { loginUser } from "../../store/thunkFunctions";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ mode: "onChange" });

  const dispatch = useDispatch();

  const onSubmit = ({ email, password }) => {
    const body = {
      email,
      password,
    };

    dispatch(loginUser(body));

    reset();
  };
  const userEmail = {
    required: "필수 필드입니다.",
  };
  const userPassword = {
    required: "필수 필드입니다.",
    minLength: {
      value: 4,
      message: "최소 4글자 입니다.",
    },
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="livecall-read-content-join">
          <div className="login-input-wrapper">
            <h3>Login</h3>
            <input
              className="login-input"
              type="email"
              placeholder="Enter Your Email"
              {...register("email", userEmail)}
            />
            {errors?.email && (
              <div>
                <span>{errors.email.message}</span>
              </div>
            )}
            <input
              className="login-input"
              type="password"
              placeholder="Enter Your Password"
              {...register("password", userPassword)}
            />
            {errors?.password && (
              <div>
                <span>{errors.password.message}</span>
              </div>
            )}

            <Link to="/sign-up">
              <p className="forget-text">아이디가 없으신가요? 회원가입</p>
            </Link>
          </div>

          <button className="button-Login" type="sumbit">
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;

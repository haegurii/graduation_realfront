import { Link } from 'react-router-dom';
import './index.css';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { registerUser } from '../../store/thunkFunctions';

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ mode: 'onChange' });

  const dispatch = useDispatch();

  const onSubmit = ({ email, password, name, role }) => {
    const body = {
      email,
      password,
      name,
      role,
      image: `http://via.placeholder.com/600x400?text=no+user+image`,
    };

    dispatch(registerUser(body));

    reset();
  };

  const userEmail = {
    required: '필수 필드입니다.',
  };
  const userName = {
    required: '필수 필드입니다.',
  };
  const userPassword = {
    required: '필수 필드입니다.',
    minLength: {
      value: 4,
      message: '최소 4글자 입니다.',
    },
  };

  return (
    <div className="sign-up-container">
      <form className="form_container" onSubmit={handleSubmit(onSubmit)}>
        <div className="livecall-read-content-join">
          <div className="sign-up-input-wrapper">
            <h3>SignUp</h3>

            <label htmlFor="sign-up-email-input">Email</label>
            <input
              id="sign-up-email-input"
              className="sign-up-input"
              type="email"
              placeholder="Add Your Email"
              {...register('email', userEmail)}
            />

            {errors?.email && (
              <div>
                <span>{errors.email.message}</span>
              </div>
            )}

            <label htmlFor="sign-up-nickname-input">Nickname</label>
            <input
              id="sign-up-nickname-input"
              className="sign-up-input"
              type="text"
              placeholder="Add Your Nickname"
              {...register('name', userName)}
            />
            {errors?.name && (
              <div>
                <span>{errors.name.message}</span>
              </div>
            )}

            <label htmlFor="sign-up-password-input">Password</label>
            <input
              id="sign-up-password-input"
              className="sign-up-input"
              type="password"
              placeholder="Add Your Password"
              {...register('password', userPassword)}
            />
            {errors?.password && (
              <div>
                <span>{errors.password.message}</span>
              </div>
            )}

            <div className="sign-up-bottom-wrapper">
              <div className="checkbox-wrapper">
                <input
                  id="checkbox"
                  className="input-check"
                  type="checkbox"
                  {...register('role')}
                />
                <label htmlFor="checkbox">농인여부</label>
              </div>

              <Link to="/login">
                <p className="before-text">이미 회원이신가요? 로그인하기</p>
              </Link>
            </div>
          </div>

          <button className="button-sign-up" type="submit">
            SignUp
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;

import React,{ChangeEvent,useState} from 'react';

import { Button, Form, Input, Switch } from 'antd';
import { LoginOutlined } from '@ant-design/icons/lib';

import PublicLayout from '../../layout/public/Public';
import { Link } from 'react-router-dom';
import { useForm } from 'antd/es/form/Form';
import { navigateHome } from '../../utils/naviagate-home';
import * as userActions  from '../../redux/auth/actions';
import { useDispatch} from "react-redux";
const { Item } = Form;


const SignIn = () => {
  const [form] = useForm();

const dispatch = useDispatch();
  interface IUser {
    email: string;
    password:string;
    // submitted:false;
  }
const [inputValues,setInputValues]=useState<IUser>()
// const[email,setEmail]=useState('')
// const[password,setPassword]=useState('')

// const { values, setValues, handleSubmit } = useFormik<IPatient>({
//   onSubmit: (values) => setSubmitted(values),
//   initialValues: { ...user }
// });



  const login = () => {
    const { email, password } =inputValues;
    if (email !== '' && password !== '') {
    form
      .validateFields()
      .then(() => {
     dispatch(userActions.login(email, password));
    // navigateHome();
       } )
      .catch(() => null);
      }else{

      }

  };
//   handleChange = (e) => {
//     const { name } = e.target;
//     this.setState({ [name]: e.target.value })
// }
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setInputValues({ ...inputValues,[e.target.name]: e.target.value });
    
  };
  return (
    <PublicLayout bgImg={`${window.origin}/content/login-page.jpg`}>
      <h4 className='mt-0 mb-1'>Login form</h4>

      <p className='text-color-200'>Login to access your Account</p>

      <Form form={form} layout='vertical' className='mb-4'>
        <Item name='login' rules={[{ required: true, message: <></> }]}>
          <Input placeholder='Email'  onChange={handleChange} name='email' />
        </Item>
        <Item name='password' rules={[{ required: true, message: <></> }]}>
          <Input placeholder='Password' type='password' onChange={handleChange} name='password' />
        </Item>

        <div className='d-flex align-items-center mb-4'>
          <Switch defaultChecked /> <span className='ml-2'>Remember me</span>
        </div>

        <Button
          block={false}
          type='primary'
          onClick={login}
          htmlType='submit'
          icon={<LoginOutlined style={{ fontSize: '1.3rem' }} />}
        >
          Login
        </Button>
      </Form>
      <br />
      <p className='mb-1'>
        <a href='#'>Forgot password?</a>
      </p>

      <p>
        Don't have an account? <Link to='sign-up'>Sign up!</Link>
      </p>
    </PublicLayout>
  );
};

export default SignIn;

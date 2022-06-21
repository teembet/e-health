import React, { ChangeEvent, useState, useEffect } from 'react';
import * as userActions from '../../redux/auth/actions';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form, Input, Switch, Select } from 'antd';
import PublicLayout from '../../layout/public/Public';
import { Link } from 'react-router-dom';
import { useForm } from 'antd/es/form/Form';
import { navigateHome } from '../../utils/naviagate-home';
import { AppState, store } from '../../redux/store';
const { Item } = Form;

const SignUp = () => {
  const users = useSelector((state: AppState) => state.registration);

  const [form] = useForm();

  const dispatch = useDispatch();
  const [inputValues, setInputValues] = useState<IUser>();
  // const [users,setUsers]=useState("")

  interface IUser {
    name: string;
    email: string;
    password: string;
    role: string;
    // submitted:false;
  }
  //   useEffect(() => {

  //     // When state will be updated(in our case, when items will be fetched),
  //     // we will update local component state and force component to rerender
  //     // with new data.

  // })
  const signUp = () => {
    const { name, email, password, role } = inputValues;

    if (email !== '' && password !== '' && name !== '' && role !== '') {
      form
        .validateFields()
        .then(() => {
          const user = users.find((x) => x.email === email);
          if (user && user.email === email) {
            console.log('user already exist');
            //toast error here
          } else {
            dispatch(userActions.register(inputValues));
            dispatch(userActions.login(inputValues));
            // dispatch(userActions.createUser(inputValues))
            //  setUsers((store.getState().registration))

            navigateHome();
          }
        })
        .catch((error) => console.log(error));
    } else {
      //toast input error
    }
  };
  const handleGenderSelect = (value) => {
    setInputValues({ ...inputValues, role: value });
  };
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setInputValues({ ...inputValues, [e.target.name]: e.target.value });
  };

  return (
    <PublicLayout bgImg={`${window.origin}/content/register-page.jpg`}>
      <h4 className='mt-0 mb-1'>Sign up</h4>
      <p className='text-color-200'>Create your Account</p>

      <Form form={form} layout='vertical' className='mb-5'>
        <Item name='name' rules={[{ required: true, message: <></> }]}>
          <Input placeholder='Name' onChange={handleChange} name='name' />
        </Item>

        <Item
          name='email'
          rules={[
            { required: true, message: <></> },
            { type: 'email', message: <></> }
          ]}
        >
          <Input placeholder='Email address' type='email' onChange={handleChange} name='email' />
        </Item>

        <Item name='password' rules={[{ required: true, message: <></> }]}>
          <Input placeholder='Password' type='password' onChange={handleChange} name='password' />
        </Item>

        <Select
          placeholder='Role'
          onChange={handleGenderSelect}
          // className={hasError('gender')}
          // onBlur={() => setFieldTouched('gender')}
        >
          <Select.Option value='Doctor'>Doctor</Select.Option>
          <Select.Option value='Nurse'>Nurse</Select.Option>
          <Select.Option value='Pharmacy'>Pharmacy</Select.Option>
          <Select.Option value='Lab'>Lab</Select.Option>
          <Select.Option value='RecordAdmin'>RecordAdmin</Select.Option>
        </Select>

        <div className='d-flex align-items-center mb-4 mt-5'>
          <Switch defaultChecked /> <span className='ml-2'>I agree to the Terms and Privacy.</span>
        </div>

        <Button
          type='primary'
          onClick={signUp}
          icon={<span className='icofont icofont-plus mr-2' style={{ fontSize: '1.2rem' }} />}
        >
          Register
        </Button>
      </Form>

      <p>
        Have an account? <Link to='sign-in'>Sign in!</Link>
      </p>
    </PublicLayout>
  );
};

export default SignUp;

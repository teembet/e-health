import React,{ChangeEvent,useState,useEffect} from 'react';

import { Button, Form, Input, Switch } from 'antd';
import { LoginOutlined } from '@ant-design/icons/lib';

import PublicLayout from '../../layout/public/Public';
import { Link } from 'react-router-dom';
import { useForm } from 'antd/es/form/Form';
import { navigateHome } from '../../utils/naviagate-home';
import * as userActions  from '../../redux/auth/actions';
import { useDispatch,useSelector} from "react-redux";
import { AppState, store } from '../../redux/store';

const { Item } = Form;


const SignIn = () => {
  const [form] = useForm();
  
  const [inputValues,setInputValues]=useState<IUser>()
const dispatch = useDispatch();
const users=useSelector((state:AppState)=>state.registration)
  interface IUser {
    email: string;
    password:string;
    
  }


useEffect(() => {
  
    // When state will be updated(in our case, when items will be fetched), 
    // we will update local component state and force component to rerender 
    // with new data.
  //  setUsers((store.getState().registration)?(store.getState().registration):null)
   
})
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
      const user=  users.find(x => x.email === email)
console.log(user,"users")
    //   users.filter((user)=>{
    //     if(searchQuery===""){
    //       console.log("its empty")
    //       return person
    //     }
    //     else if (person.name.toLowerCase().includes(searchQuery.toLowerCase())){
    //       console.log(person,"its not empty")
    //    setFilterData([...filterData,person])
    //  console.log(user,"ittt")
     if (user){
      dispatch(userActions.login(user));
        navigateHome();
     }else{
       console.error("user not in the system")
     }
  
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
{/* <p>{{users}}</p> */}
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

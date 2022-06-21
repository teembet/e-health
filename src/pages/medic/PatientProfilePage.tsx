import React, { ChangeEvent, useState, useEffect } from 'react';
import { Button, Card, Form, Input, Select, Timeline } from 'antd';

import { useFormik } from 'formik';

import { IPageData } from '../../interfaces/page';

import { usePageData } from '../../hooks/usePage';
import { useGetPatient } from '../../hooks/useGetPatient';
import { useGetBillings } from '../../hooks/useGetBillings';

import ImageLoader from '../../layout/components/patients/ImageLoader';
import BillingTable from './components/BillingTable';
import { Redirect, useLocation } from 'react-router-dom';
import { usePatients } from '../../hooks/usePatients';
import { useSelector } from 'react-redux';
const pageData: IPageData = {
  title: 'Patient profile page',
  fulFilled: true,
  breadcrumbs: [
    {
      title: 'Medicine',
      route: 'default-dashboard'
    },
    {
      title: 'Doctors',
      route: 'default-dashboard'
    },
    {
      title: 'Liam Jouns'
    }
  ]
};

const FormItem = Form.Item;
const Option = Select.Option;

const ProfileForm = ({ patient, handleChange }) => {
  // const handleGenderSelect = (value) => {

  //   setInputValues({...inputValues,"role":value});

  // }

  return (
    <Form layout='vertical'>
      <FormItem label='Full name'>
        <Input
          defaultValue={patient.name}
          placeholder='Full name'
          name='name'
          onChange={handleChange}
        />
      </FormItem>
      {/* 
      <FormItem label='Id'>
        <Input defaultValue={patient.id} placeholder='Id' name='id'  onChange={handleChange}/>
      </FormItem> */}

      <div className='row'>
        <div className='col-md-6 col-sm-12'>
          <FormItem label='Age'>
            <Input
              defaultValue={patient.age}
              placeholder='Age'
              name='age'
              onChange={handleChange}
            />
          </FormItem>
        </div>
        <div className='col-md-6 col-sm-12'>
          <FormItem label='Gender'>
            <Select defaultValue={patient.gender} placeholder='Gender'>
              <Option value='male'>Male</Option>
              <Option value='female'>Female</Option>
            </Select>
          </FormItem>
        </div>
      </div>

      <FormItem label='Phone'>
        <Input
          defaultValue={patient.number}
          placeholder='Phone'
          name='phone'
          onChange={handleChange}
        />
      </FormItem>

      <FormItem label='Address'>
        <Input.TextArea
          rows={4}
          defaultValue={patient.address}
          placeholder='Address'
          name='address'
          onChange={handleChange}
        />
      </FormItem>

      <FormItem label='Last visit'>
        <Input defaultValue={patient.lastVisit} placeholder='Last visit' readOnly />
      </FormItem>

      <FormItem label='Need Doctor'>
        <Select defaultValue={patient.needDoctor} placeholder='Status'>
          <Option value='true'>Yes</Option>
          <Option value='false'>No</Option>
        </Select>
      </FormItem>
      <FormItem label='Need Pharmarcy'>
        <Select defaultValue={patient.needPharmacy} placeholder='Status'>
          <Option value='true'>Yes</Option>
          <Option value='false'>No</Option>
        </Select>
      </FormItem>
      <FormItem label='Need Lab'>
        <Select defaultValue={patient.needLab} placeholder='Status'>
          <Option value='true'>Yes</Option>
          <Option value='false'>No</Option>
        </Select>
      </FormItem>
    </Form>
  );
};

const PatientTimeline = ({ userRole, handleTimeline, patient }) => {
  const { TextArea } = Input;

  return (
    <Timeline mode='left'>
      {/* <Timeline.Item color='red'>
      <div className='d-flex flex-column'>
        <h4 className='m-0'>New prescription</h4>
        <span className='text-base text-color-100'>Now</span>
        <span className='text-base'>
          Aenean lacinia bibendum nulla sed consectetur. Nullam id dolor id nibh ultricies vehicula
          ut id elit.
        </span>
      </div>
    </Timeline.Item> */}
      {/* 
    <Timeline.Item color='blue'>
      <div className='d-flex flex-column'>
        <h4 className='m-0'>Appointment</h4>
        <span className='text-base text-color-100'>2m ago</span>
        <span className='text-base'>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur nam nisi veniam.
        </span>
      </div>
    </Timeline.Item> */}
      {userRole == 'Doctor' ? (
        <Timeline.Item color='yellow'>
          <div className='d-flex flex-column'>
            <h4 className='m-0'>Doctors Report</h4>
            <span className='text-base text-color-100'>2h ago</span>
            <TextArea
              className='text-base'
              placeholder='Note'
              onChange={handleTimeline}
              name='DoctorNote'
              defaultValue={patient.DoctorNote ? patient.DoctorNote : ''}
            />
          </div>
        </Timeline.Item>
      ) : (
        <Timeline.Item color='yellow'>
          <div className='d-flex flex-column'>
            <h4 className='m-0'>Doctors Report</h4>
            <span className='text-base text-color-100'>2h ago</span>
            <TextArea
              className='text-base'
              placeholder='Note'
              name='DoctorNote'
              defaultValue={patient.DoctorNote ? patient.DoctorNote : ''}
            />
          </div>
        </Timeline.Item>
      )}

      {/* {userRole == 'Nurse' && (
        <Timeline.Item color='yellow'>
          <div className='d-flex flex-column'>
            <h4 className='m-0'>Doctors Report</h4>
            <span className='text-base text-color-100'>2h ago</span>
            <TextArea
              className='text-base'
              placeholder='Note'
              onChange={handleTimeline}
              name='NurseNote'
            />
          </div>
        </Timeline.Item>
      )} */}

      {/* {userRole == 'Pharmacy' && (
        <Timeline.Item color='pink'>
          <div className='d-flex flex-column'>
            <h4 className='m-0'>Pharmacist Report</h4>
            <span className='text-base text-color-100'>15h ago</span>
            <TextArea
              className='text-base'
              placeholder='Note'
              onChange={handleTimeline}
              name='PharmacyNote'
            />
          </div>
        </Timeline.Item>
      )} */}

      {/* {userRole == 'Lab' && (
        <Timeline.Item color='blue'>
          <div className='d-flex flex-column'>
            <h4 className='m-0'>Lab Report</h4>
            <span className='text-base text-color-100'>Jul 10</span>
            <TextArea
              className='text-base'
              placeholder='Note'
              onChange={handleTimeline}
              name='LabNote'
            />
          </div>
        </Timeline.Item>
      )} */}

      {/* <Timeline.Item color='red'>
      <div className='d-flex flex-column'>
        <h4 className='m-0'>Examination</h4>
        <span className='text-base text-color-100'>Jul 11</span>
        <TextArea  className='text-base' defaultValue={'tim'} placeholder='Full name'/>
      </div>
    </Timeline.Item> */}

      {/* <Timeline.Item color='green'>
      <div className='d-flex flex-column'>
        <h4 className='m-0'>Re-Examination</h4>
        <span className='text-base text-color-100'>Jul 25</span>
        <TextArea  className='text-base' defaultValue={'tim'} placeholder='Full name'/>
      </div>
    </Timeline.Item> */}
    </Timeline>
  );
};

const PatientProfilePage = () => {
  const userRole = useSelector((state: any) => state.login.user.role);
  const row = useLocation();
  const patient: any = row.state;
  const [inputValues, setInputValues] = useState([]);
  const [notes, setNotes] = useState([]);
  const billings = useGetBillings();
  const { editPatient } = usePatients();

  usePageData(pageData);
  const editPatients = (patient) => {
    const values = { ...patient, ...inputValues };
    const note = { ...patient, ...notes };

    editPatient(values);
    editPatient(note);
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setInputValues({ ...inputValues, [e.target.name]: e.target.value });
  };

  const handleTimeline = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setNotes({ ...notes, [e.target.name]: e.target.value });
  };

  // const handleSelect = (value) => {

  //   setInputValues({...inputValues,"role":value});

  // }

  if (!patient) {
    return <Redirect to='/vertical/patients' />;
  }
  return (
    patient && (
      <>
        <div className='row mb-4'>
          <div className='col-md-6 col-sm-12'>
            <div className='header mb-3'>
              <h6 className='mt-0 mb-3'>Photo</h6>
              <ImageLoader src={patient.profileImg as string} size={100} />
            </div>

            <div className='info stack'>
              <ProfileForm patient={patient} handleChange={handleChange} />
              <Button onClick={() => editPatients(patient)} type='primary'>
                Save Changes
              </Button>
            </div>
          </div>

          <div className='col-md-6 col-sm-12'>
            <Card>
              <PatientTimeline
                patient={patient}
                userRole={userRole}
                handleTimeline={handleTimeline}
              />
            </Card>
          </div>
        </div>

        {/* <Card title='Billings' className='mb-0'>
          <BillingTable billings={billings} />
        </Card> */}
      </>
    )
  );
};

export default PatientProfilePage;

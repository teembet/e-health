import React from 'react';

import { usePageData } from '../../../hooks/usePage';
import { usePatients } from '../../../hooks/usePatients';

import PatientsTable from './PatientsTable';

import { IPageData } from '../../../interfaces/page';
import { useSelector } from 'react-redux';
import { AppState } from '../../../redux/store';
import { Redirect } from 'react-router-dom';

const pageData: IPageData = {
  title: 'Patients',
  fulFilled: true,
  breadcrumbs: [
    {
      title: 'Medicine',
      route: 'default-dashboard'
    },
    {
      title: 'Patients'
    }
  ]
};

const PatientsPage = () => {
  const { patients, editPatient, deletePatient } = usePatients();
  usePageData(pageData);
  const user=useSelector((state:AppState)=>state.login["user"]);

  if(!user){
   return <Redirect to="/public/sign-in"/>
  }
  return (
    <>
   
    
      <PatientsTable
        onDeletePatient={deletePatient}
        onEditPatient={editPatient}
        patients={patients}
       
      />
    </>
  );
};

export default PatientsPage;

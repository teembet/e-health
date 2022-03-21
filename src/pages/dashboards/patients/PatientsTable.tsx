import React, { useState } from 'react';
import { Avatar, Table, Button, Modal, Tag } from 'antd';
import { ColumnProps } from 'antd/es/table';
import Search from '../../../layout/components/search/Search';
import { IPatient } from '../../../interfaces/patient';

import { AppState, history } from '../../../redux/store';
import PatientForm from '../../../layout/components/patients/PatientForm';
import { useSelector } from 'react-redux';

type Props = {
  patients;
  onEditPatient?: (patient: IPatient) => void;
  onDeletePatient?: (id: string) => void;
};

type PatientsImgProps = {
  img: string;
};

const PatientImg = ({ img }: PatientsImgProps) => {
  const isData = img.startsWith('data:image');
  const isWithPath = img.startsWith('http');

  if (isData || isWithPath) {
    return <Avatar size={40} src={img} />;
  }

  return <Avatar size={40} src={`${window.location.origin}/${img}`} />;
};

const PatientsTable = ({
  patients,
  onEditPatient,
  onDeletePatient = () => null
}: Props) => {
  const [patient, setPatient] = useState(null);
  const [visibility, setVisibility] = useState(false);
const [searchQuery,setSearchQuery]=useState("")

const [patientsRecords,setPatientsRecords] =useState(patients)
  const closeModal = () => setVisibility(false);
  const user=useSelector((state:AppState)=>state.login["user"]);
  const handleShowInfo = (row) => history.push({pathname:'/vertical/patient-profile',
  state:row});
  const handleDeletePatient = (id) => onDeletePatient(id);
  // const handleEditPatient = (patient: IPatient) => {
  //   setPatient(patient);
  //   setVisibility(true);
  // };

  const actions = (patient: IPatient) => (
    <div className='buttons-list nowrap'>
      <Button shape='circle' onClick={()=>handleShowInfo(patient)}>
        <span className='icofont icofont-external-link' />
      </Button>
      {/* <Button onClick={()=>handleEditPatient(patient)} shape='circle' type='primary'>
        <span className='icofont icofont-edit-alt' />
      </Button> */}
      <Button onClick={handleDeletePatient.bind({}, patient.id)} shape='circle' danger>
        <span className='icofont icofont-ui-delete' />
      </Button>
    </div>
  );

  const columns: ColumnProps<IPatient>[] = [
    {
      key: 'img',
      title: 'Photo',
      dataIndex: 'img',
      render: (img) => <PatientImg img={img} />
    },
    {
      key: 'name',
      dataIndex: 'name',
      title: 'Name',
      sorter: (a, b) => (a.name > b.name ? 1 : -1),
      render: (name) => <strong>{name}</strong>
    },
    {
      key: 'id',
      dataIndex: 'id',
      title: 'ID',
      sorter: (a, b) => (a.id > b.id ? 1 : -1),
      render: (id) => (
        <span className='nowrap' style={{ color: '#a5a5a5' }}>
          {id}
        </span>
      )
    },
    {
      key: 'age',
      dataIndex: 'age',
      title: 'Age',
      sorter: (a, b) => a.age - b.age,
      render: (age) => (
        <span className='nowrap' style={{ color: '#a5a5a5' }}>
          {age}
        </span>
      )
    },
    {
      key: 'address',
      dataIndex: 'address',
      title: 'Address',
      render: (address) => <span style={{ minWidth: 200, display: 'block' }}>{address}</span>
    },
    {
      key: 'number',
      dataIndex: 'number',
      title: 'Number',
      render: (phone) => (
        <span className='d-flex align-baseline nowrap' style={{ color: '#336cfb' }}>
          <span className='icofont icofont-ui-cell-phone mr-1' style={{ fontSize: 16 }} />
          {phone}
        </span>
      )
    },
    {
      key: 'visit',
      dataIndex: 'lastVisit',
      title: 'Last visit',
      render: (visit) => (
        <span className='nowrap' style={{ color: '#a5a5a5' }}>
          {visit}
        </span>
      )
    },
    {
      key: 'status',
      dataIndex: 'status',
      title: 'Status',
      render: (status,needDoctor,needLab) => (
        // <Tag style={{ borderRadius: 20 }} color={status === 'Approved' ? '#b7ce63' : '#cec759'}>
        //   {status}
        // </Tag>
       <span className='nowrap' style={{ color: '#a5a5a5' }}  >
        {status} {user["role"]}
      </span> 
  
     
      ),
      sorter: (a, b) => (a.status > b.status ? 1 : -1)
    },
    {
      key: 'actions',
      title: 'Actions',
      render: actions
    }
  ];

  const pagination = patients.length <= 10 ? false : {};
const handleSearch=(search)=>{
setSearchQuery(search);
if(search===""){
  console.log("no records")
  return setPatientsRecords(patients)
}

const filteredData=patients.filter(person=>
person.name.toLowerCase().includes(searchQuery.toLowerCase()))
setPatientsRecords(filteredData)
}
  return (
    <>
     <div className="mb-3">
    <Search handleSearch={handleSearch}/>
    </div>
      <Table
        pagination={pagination}
        className='accent-header'
        rowKey={patientsRecords=>patientsRecords.id}
        dataSource={patientsRecords}
        columns={columns}
      />

      <Modal
        visible={visibility}
        footer={null}
        onCancel={closeModal}
        title={<h3 className='title'>Add patient</h3>}
      >
        <PatientForm
          submitText='Update patient'
          onCancel={closeModal}
          onSubmit={()=>onEditPatient(patient)}
          patient={patient}
        />
      </Modal>
    </>
  );
};

export default PatientsTable;

import React, { useRef, useState } from 'react';
import { IUserLink } from '../../../interfaces/user';
import { Button, Divider, Input } from 'antd';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons/lib';

type Props = { links?: IUserLink[] };

const NetworkLayout = ({ iconInput, linkInput, actionBtn = null }) => (
  <div className='row'>
    <div className='col'>
      <div className='row'>
        <div className='col-md-6 col-sm-12'>{iconInput}</div>

        <div className='col-md-6 col-sm-12'>{linkInput}</div>
      </div>
    </div>

    <div className='col col-auto'>{actionBtn}</div>
  </div>
);

const AddLink = ({ onLinkAdd }) => {
  const buttonStyle = { background: 'white', border: 'none' };

  const iconInput = useRef<Input>(null);
  const linkInput = useRef<Input>(null);

  const getUserLink = (): IUserLink => {
    const icon = iconInput.current.input.value;
    const link = linkInput.current.input.value;

    return {
      icon,
      link
    };
  };

  const resetInputs = () => {
    iconInput.current.setValue('');
    linkInput.current.setValue('');
  };

  const handleAdd = () => {
    const userLink = getUserLink();
    onLinkAdd(userLink);
    resetInputs();
  };

  return (
    <NetworkLayout
      iconInput={<Input ref={iconInput} placeholder='Icon class' />}
      linkInput={<Input ref={linkInput} placeholder='Link' />}
      actionBtn={
        <Button
          shape='circle'
          onClick={handleAdd}
          style={buttonStyle}
          icon={<PlusOutlined className='icon-blue' />}
        />
      }
    />
  );
};

const Socials = ({ links }: Props) => {
  const [networks, setNetworks] = useState(links);

  const addNetwork = (link: IUserLink) => setNetworks([...networks, link]);

  const removeNetwork = (index) => {
    const predicate = (_, _index) => _index !== index;
    const filteredNetworks = networks.filter(predicate);

    setNetworks(filteredNetworks);
  };

  const SocialLink = ({ link, icon }: IUserLink, index) => {
    const buttonStyle = { background: 'white', border: 'none' };

    return (
      <NetworkLayout
        key={index}
        linkInput={<Input defaultValue={link} />}
        iconInput={<Input readOnly prefix={<i className={`icofont ${icon}`} />} value={icon} />}
        actionBtn={
          <Button
            shape='circle'
            style={buttonStyle}
            onClick={() => removeNetwork(index)}
            icon={<DeleteOutlined className='icon-error' />}
          />
        }
      />
    );
  };

  return (
    <>
      {networks.length ? (
        <>
          <div className='stack'>
            <h5>Social networks</h5>
            {networks.map(SocialLink)}
          </div>
          <Divider />
        </>
      ) : null}

      <h5>Add social network</h5>
      <AddLink onLinkAdd={addNetwork} />
    </>
  );
};

export default Socials;

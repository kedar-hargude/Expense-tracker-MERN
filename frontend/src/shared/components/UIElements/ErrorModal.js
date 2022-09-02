import React from 'react';

import Modal from './Modal';
import Button from '../FormElements/Button';

const ErrorModal = props => {
  return (
    <Modal
      onCancel={props.onClear}
      header="An Error Occurred!"
      show={!!props.error}
    >
      <p className='center'>{props.error}</p>
      <div className='center'>
        <Button onClick={props.onClear} bold>Okay</Button>
      </div>
    </Modal>
  );
};

export default ErrorModal;

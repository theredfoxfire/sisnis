import React from 'react';
import {
  Button,
  Icon,
  Header, Modal,
} from 'semantic-ui-react';
import { storeActions, getAllState } from '../store/Store.js';

const ModalBox = () =>
{ let {isModalOpen, isShowReject, confirmAction, dialogTitle, dialogMessage, closeModalAction} = getAllState();
  return <Modal
    closeIcon
    open={isModalOpen}
    onClose={() => closeModalAction ? closeModalAction() : storeActions.setModalStatus(false)}
    onOpen={() => storeActions.setModalStatus(true)}
  >
    <Header icon='trash' content={dialogTitle} />
    <Modal.Content>
      <p>
        {dialogMessage}
      </p>
    </Modal.Content>
    <Modal.Actions>
      {isShowReject && <Button color='red' onClick={() => storeActions.setModalStatus(false)}>
        <Icon name='remove' /> Tidak
      </Button>}
      <Button color='green' onClick={() => confirmAction()}>
        <Icon name='checkmark' /> Ya
      </Button>
    </Modal.Actions>
  </Modal>;}

export default ModalBox;

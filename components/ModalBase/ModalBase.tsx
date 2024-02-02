import React from 'react';
import { Modal, Alert } from 'react-native';
import { ModalProps } from '../../types';

const ModalBase = ({children, state, action}: ModalProps): React.JSX.Element => {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={state}
            onRequestClose={() => {
                action(!state);
            }}>
           {children}
        </Modal>
    );

};

export default ModalBase;

import React, { useState } from 'react';
import { Input, Modal, Button } from 'antd';
import Styled from 'styled-components';
import Lens from '../../../assets/lens.svg';

const ModalWrapper = Styled.div`
    button {
        border: none;
    }
`;

export default function Search({ onSearch }) {
    const [showModal, setShowModal] = useState(false);
    return (
        <ModalWrapper>
            <Button onClick={() => setShowModal(true)} icon={<Lens />} />
            <Modal
                closable={false}
                footer={null}
                visible={showModal}
            >
                <Input.Search
                    allowClear="true"
                    enterButton={<Button icon={<Lens />} />}
                    onSearch={(value) => {
                        setShowModal(false);
                        onSearch(value);
                    }}
                />
            </Modal>
        </ModalWrapper>
    );
}

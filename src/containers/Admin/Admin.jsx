import axios from 'axios';
import { Table, Tag, Space, Button, Modal } from 'antd';
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import './Admin.scss';

const Admin = () => {
    const history = useHistory();
    const [selectedEvent, setSelectedEvent] = useState({});
    const [dateEvents, setDateEvents] = useState([]);

    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    useEffect(() => {
        const { token } = JSON.parse(localStorage.getItem('user'));
        const tokenUser = {
            headers: { Authorization: `Bearer ${token}` }
        };
        axios.get("http://localhost:3001/events", tokenUser)
            .then((res) => {
                console.log(res);
                setDateEvents(res.data);
                return res;
            }).catch((err) => {
                console.log(err);
            });
    }, [])

    const deleteEvent = async (id) => {
        const { token } = JSON.parse(localStorage.getItem('user'));
        const tokenUser = {
            headers: { Authorization: `Bearer ${token}` }
        };
        try {
            await axios.delete(`http://localhost:3001/events/${id}`, tokenUser);
            setDateEvents(dateEvents.filter(element => element.id !== id));
        } catch (error) {
            console.log(error);
        }

    }

    const eventHandler = (ev) => {
        setSelectedEvent({ ...selectedEvent, [ev.target.name]: ev.target.value });
    };

    const columns = [
        {
            title: 'Event',
            dataIndex: 'event',
            key: 'event',
        },
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
        },
        {
            title: 'Id',
            dataIndex: 'UserId',
            key: 'UserId',
        },
        {
            title: 'Edit',
            dataIndex: 'edit',
            key: 'id',
            render: (text, record) => (
                <Space size="middle">
                    <Button onClick={() => { setSelectedEvent(record); showModal(); }}>Edit</Button>
                </Space>
            ),
        },
        {
            title: 'Delete',
            dataIndex: 'delete',
            key: 'id',
            render: (text, record) => (
                <Space size="middle">
                    <Button onClick={() => deleteEvent(record.id)}>Delete</Button>
                </Space>
            ),
        }
    ];



    return (
        <div>
            <Modal title="Basic Modal" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                <p>{selectedEvent.id}</p>
                
                <form className="register-form">
                    <h4>Event <input type="text" name="event" value={selectedEvent.event} onChange={eventHandler} /></h4>
                    <h4>Date <input type="date" name="date" value={selectedEvent.date} onChange={eventHandler} /></h4>
                </form>
                {JSON.stringify(selectedEvent)}
              
            </Modal>
            <div className="events">
                <Table dataSource={dateEvents} columns={columns} />;
            </div>
        </div>
    )
}

export default Admin
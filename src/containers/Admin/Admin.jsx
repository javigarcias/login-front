import axios from 'axios';
import { Table, Tag, Space, Button, Modal } from 'antd';
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import './Admin.scss';

const Admin = () => {
    const history = useHistory();
    const user = JSON.parse(localStorage.getItem('user'));
    const tokenUser = {
        headers: { Authorization: `Bearer ${user.token}` }
    };
    const [searchEvent, setSearchEvent] = useState();
    const [selectedEvent, setSelectedEvent] = useState({});
    const [dateEvents, setDateEvents] = useState([]);
    const [newEvent, setNewEvent] = useState({
        event: "",
        date: "",
        UserId: user.id
    });

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isModalEditVisible, setIsModalEditVisible] = useState(false);

    const showSearchEvents = () => {
        if (searchEvent)
            return dateEvents.filter(
                element => element.event.includes(searchEvent)
            )
            return dateEvents
    };


    const showModal = () => {
        setIsModalVisible(true);
    };
    const showEditModal = () => {
        setIsModalEditVisible(true);
    };

    const createEvent = () => {
        try {

        } catch (error) {

        }
    }

    const handleOk = () => {
        axios.post(`${process.env.REACT_APP_BACKEND_URL}/events/`, newEvent, tokenUser)
            .then((res) => {
                setDateEvents([...dateEvents, newEvent]);
                setIsModalVisible(false);
                setNewEvent({});
            }).catch((err) => {
                console.log(err);
            });
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        setSelectedEvent({});
    };

    const handleEditOk = () => {
        axios.put(`${process.env.REACT_APP_BACKEND_URL}/events/${selectedEvent.id}`, selectedEvent, tokenUser)
            .then((res) => {
                setDateEvents(dateEvents.map((record) => { return record.id === selectedEvent.id ? selectedEvent : record; }));
                setIsModalEditVisible(false);
                setSelectedEvent({});
            }).catch((err) => {
                console.log(err);
            });
    };

    const handleEditCancel = () => {
        setIsModalEditVisible(false);
        setSelectedEvent({});
    };

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/events`, tokenUser)
            .then((res) => {
                console.log(res);
                setDateEvents(res.data);
                return res;
            }).catch((err) => {
                console.log(err);
            });
    }, [])

    const deleteEvent = async (id) => {

        try {
            await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/events/${id}`, tokenUser);
            setDateEvents(dateEvents.filter(element => element.id !== id));
        } catch (error) {
            console.log(error);
        }

    }

    const eventHandler = (ev) => {
        setSelectedEvent({ ...selectedEvent, [ev.target.name]: ev.target.value });
    };
    const eventHandlerNewEvent = (ev) => {
        setNewEvent({ ...newEvent, [ev.target.name]: ev.target.value });
    };
    const eventHandlerSearch = (ev) => {
        setSearchEvent(ev.target.value);
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
                    <Button onClick={() => { setSelectedEvent(record); showEditModal(); }}>Edit</Button>
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
            <Modal title="Edit Event" visible={isModalEditVisible} onOk={() => handleEditOk()} onCancel={handleEditCancel}>
                <p>Id: {selectedEvent.id}</p>

                <form className="register-form">
                    <h4>Event <input type="text" name="event" value={selectedEvent.event} onChange={eventHandler} /></h4>
                    <h4>Date:{selectedEvent.date} <input type="date" name="date" value={selectedEvent.date} onChange={eventHandler} /></h4>
                </form>

            </Modal>
            <Modal title="Create Event" visible={isModalVisible} onOk={() => handleOk()} onCancel={handleCancel}>
                <form className="register-form">
                    <h4>Event <input type="text" name="event" value={newEvent.event} onChange={eventHandlerNewEvent} /></h4>
                    <h4>Date:{newEvent.date} <input type="date" name="date" value={newEvent.date} onChange={eventHandlerNewEvent} /></h4>
                </form>

            </Modal>
            <div>
                <input type="text" name="searchBar" onChange={eventHandlerSearch} placeholder="Search" />
                {console.log(searchEvent)}
                <Button onClick={() => showModal()}>Create Event</Button>

            </div>
            <div className="events">
                <Table dataSource={showSearchEvents()} columns={columns} />;
            </div>
        </div>
    )
}

export default Admin
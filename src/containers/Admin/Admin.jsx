import axios from 'axios';
import { Table, Tag, Space } from 'antd';
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import './Admin.scss';

const Admin = () => {
    const history = useHistory();
    const [event, setEvent] = useState();
    const [dateEvents, setDateEvents] = useState([]);

    useEffect(() => {
        const { token } = JSON.parse(localStorage.getItem('user'));
        console.log(token)
        const tokenUser = {
            headers: { Authorization: `Bearer ${token}` }
        };
        console.log(tokenUser)
        axios.get("http://localhost:3001/events", tokenUser)
            .then((res) => {
                console.log(res);
                setDateEvents(res.data);
                return res;
            }).catch((err) => {
                console.log(err);
            });
    }, [])
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
        },
        {
            title: 'Delete',
            dataIndex: 'delete',
            key: 'id',
        }
      ];



    return (
        <div>
            <div className="events">
                <Table dataSource={dateEvents} columns={columns} />;
            </div>
        </div>
    )
}

export default Admin
import React from 'react';
import axios from 'axios';
import DataTable from 'react-data-table-component';

import style from './Dashboard.module.scss';

import { useNavigate } from 'react-router-dom';

import { Header } from '../../components/Header';

import blockUserImg from '../../assets/images/blockUser.svg';
import unblockUserImg from '../../assets/images/unblockUser.svg';
import deleteUserImg from '../../assets/images/deleteUser.svg';

export const Dashboard = () => {
    const [usersInfo, setUsersInfo] = React.useState([]);

    const [selectedId, setSelectedId] = React.useState([]);

    const navigate = useNavigate();

    React.useEffect(() => {
        (async () => {
            const fetchUsers = async () => {
                try {
                    const token = window.localStorage.getItem('token') || '';
                    const { data } = await axios.get('khvan-vladimir-dashboard.herokuapp.com/users', {
                        headers: { Authorization: `Bearer ${token}` },
                    });
                    if (data.isAuthorized) {
                        setUsersInfo(data.users);
                    } else {
                        window.localStorage.removeItem('token');
                        window.localStorage.removeItem('id');
                        window.localStorage.removeItem('username');
                        navigate('/login');
                    }
                } catch (error) {
                    console.log(error);
                }
            };

            await fetchUsers();
        })();
    }, []);

    const columns = [
        {
            name: 'ID',
            selector: (row) => row.id,
        },
        {
            name: 'Username',
            selector: (row) => row.username,
        },
        {
            name: 'Password',
            selector: (row) => row.password,
        },
        {
            name: 'Email',
            selector: (row) => row.email,
        },
        {
            name: 'Created at',
            selector: (row) => row.createdAt.split('T')[0],
        },
        {
            name: 'Last Visit',
            selector: (row) => row.lastVisit.split('T')[0],
        },
        {
            name: 'Status',
            selector: (row) => row.status,
        },
        {
            name: 'Actions',
            selector: (row) => (
                <>
                    <button onClick={() => blockUsers([row.id])}>
                        <img src={blockUserImg} alt="block user" />
                    </button>
                    <button onClick={() => unblockUsers([row.id])}>
                        <img src={unblockUserImg} alt="unblock user" />
                    </button>
                    <button onClick={() => deleteUsers([row.id])}>
                        <img src={deleteUserImg} alt="delete user" />
                    </button>
                </>
            ),
        },
    ];

    const handleChange = ({ selectedRows }) => {
        setSelectedId(selectedRows.map((user) => user.id));
        console.log('Selected Rows: ', selectedRows);
    };

    const deleteUsers = async (ids) => {
        if (ids.length > 0) {
            try {
                const token = window.localStorage.getItem('token') || '';
                const { data } = await axios.delete('khvan-vladimir-dashboard.herokuapp.com/users', {
                    headers: { Authorization: `Bearer ${token}` },
                    data: { ids },
                });
                if (data.isAuthorized) {
                    setUsersInfo((prevUsersInfo) =>
                        prevUsersInfo.filter((userInfo) => !ids.includes(userInfo.id)),
                    );
                } else {
                    window.localStorage.removeItem('token');
                    window.localStorage.removeItem('id');
                    window.localStorage.removeItem('username');
                    navigate('/login');
                }
            } catch (error) {
                console.log(error);
            }
        }
    };

    const blockUsers = async (ids) => {
        if (ids.length > 0) {
            try {
                const token = window.localStorage.getItem('token') || '';
                const { data } = await axios.put('khvan-vladimir-dashboard.herokuapp.com/users/block', {
                    ids,
                }, {headers: { Authorization: `Bearer ${token}` },});
                if (data.isAuthorized) {
                    setUsersInfo((prevUsersInfo) =>
                        prevUsersInfo.map((userInfo) =>
                            ids.includes(userInfo.id)
                                ? { ...userInfo, status: 'blocked' }
                                : userInfo,
                        ),
                    );
                } else {
                    window.localStorage.removeItem('token');
                    window.localStorage.removeItem('id');
                    window.localStorage.removeItem('username');
                    navigate('/login');
                }
            } catch (error) {
                console.log(error);
            }
        }
    };

    const unblockUsers = async (ids) => {
        if (ids.length > 0) {
            try {
                const token = window.localStorage.getItem('token') || '';
                const { data } = await axios.put('khvan-vladimir-dashboard.herokuapp.com/users/unblock', {
                    ids,
                }, {headers: { Authorization: `Bearer ${token}` },});
                console.log(data);
                if (data.isAuthorized) {
                    setUsersInfo((prevUsersInfo) =>
                        prevUsersInfo.map((userInfo) =>
                            ids.includes(userInfo.id)
                                ? { ...userInfo, status: 'active' }
                                : userInfo,
                        ),
                    );
                } else {
                    window.localStorage.removeItem('token');
                    window.localStorage.removeItem('id');
                    window.localStorage.removeItem('username');
                    navigate('/login');
                }
            } catch (error) {
                console.log(error);
            }
        }
    };

    return (
        <div className={`${style.dashboard} p-5`}>
            <Header isAuthorized={true} />
            <main>
                <div
                    className={
                        'w-100 d-flex justify-content-center mb-5 rounded-5 border p-3 ' +
                        style.toolbar
                    }>
                    <button className="me-5" onClick={() => blockUsers(selectedId)}>
                        <span>block</span> <img src={blockUserImg} alt="block user" />
                    </button>
                    <button className="me-5" onClick={() => unblockUsers(selectedId)}>
                        <span>unblock</span> <img src={unblockUserImg} alt="unblock user" />
                    </button>
                    <button onClick={() => deleteUsers(selectedId)}>
                        <span>delete</span> <img src={deleteUserImg} alt="delete user" />
                    </button>
                </div>

                <DataTable
                    columns={columns}
                    data={usersInfo}
                    direction="auto"
                    fixedHeaderScrollHeight="300px"
                    highlightOnHover
                    pagination
                    responsive
                    selectableRows
                    selectableRowsHighlight
                    subHeaderAlign="right"
                    subHeaderWrap
                    onSelectedRowsChange={handleChange}
                    className={style.dataTable}
                />
            </main>
        </div>
    );
};

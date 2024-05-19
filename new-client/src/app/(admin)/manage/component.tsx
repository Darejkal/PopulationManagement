import React, { useState } from 'react';
import { Table, Button, Form, Modal } from 'react-bootstrap';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
export const UserManagement = () => {
  const [users, setUsers] = useState([
    { stt: 1, username: 'user1', name: 'Nguyễn Văn A' },
  ]);
  const [newUser, setNewUser] = useState({ username: '', name: '', password: '' });
  const [show, setShow] = useState(false);
  const [selectedUser, setSelectedUser] = useState<{ stt: number, username: string, name: string } | null>(null);

  const handleAddUser = () => {
    setUsers([...users, { stt: users.length + 1, username: newUser.username, name: newUser.name }]);
    setNewUser({ username: '', name: '', password: '' });
  };

  const handleDeleteUser = (index: number) => {
    setUsers(users.filter((_, i) => i !== index));
  };

  const handleShowModal = (user: { stt: number, username: string, name: string }) => {
    setSelectedUser(user);
    setShow(true);
  };

  const handleCloseModal = () => {
    setShow(false);
    setSelectedUser(null);
  };

  const handleChangePassword = () => {
    // Handle password change logic here
    handleCloseModal();
  };

  return (
    <div>
      <h2>Quản lý Người Dùng</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>STT</th>
            <th>Tên Đăng Nhập</th>
            <th>Họ Tên</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <td>{user.stt}</td>
              <td>{user.username}</td>
              <td>{user.name}</td>
              <td>
                <Button variant="warning" onClick={() => handleShowModal(user)}>Change Password</Button>
                <Button variant="danger" onClick={() => handleDeleteUser(index)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Form className="mt-4">
        <Form.Group>
          <Form.Label>Tên Đăng Nhập</Form.Label>
          <Form.Control
            type="text"
            value={newUser.username}
            onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Họ Tên</Form.Label>
          <Form.Control
            type="text"
            value={newUser.name}
            onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Mật Khẩu</Form.Label>
          <Form.Control
            type="password"
            value={newUser.password}
            onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
          />
        </Form.Group>
        <Button variant="primary" onClick={handleAddUser}>Add User</Button>
      </Form>

      <Modal show={show} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Change Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>New Password</Form.Label>
              <Form.Control type="password" />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>Close</Button>
          <Button variant="primary" onClick={handleChangePassword}>Save Changes</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};


export const ContributionManagement = () => {
  const [contributions, setContributions] = useState([
    { stt: 1, household: 'Hộ A', amount: '500,000 đồng', purpose: 'Quỹ Vì Người Nghèo' },
  ]);
  const [newContribution, setNewContribution] = useState({ household: '', amount: '', purpose: '' });

  const handleAddContribution = () => {
    setContributions([...contributions, { stt: contributions.length + 1, ...newContribution }]);
    setNewContribution({ household: '', amount: '', purpose: '' });
  };

  const handleDeleteContribution = (index: number) => {
    setContributions(contributions.filter((_, i) => i !== index));
  };

  return (
    <div>
      <h2>Quản lý Đóng Góp</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>STT</th>
            <th>Hộ Gia Đình</th>
            <th>Số Tiền</th>
            <th>Mục Đích</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {contributions.map((contribution, index) => (
            <tr key={index}>
              <td>{contribution.stt}</td>
              <td>{contribution.household}</td>
              <td>{contribution.amount}</td>
              <td>{contribution.purpose}</td>
              <td>
                <Button variant="danger" onClick={() => handleDeleteContribution(index)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Form className="mt-4">
        <Form.Group>
          <Form.Label>Hộ Gia Đình</Form.Label>
          <Form.Control
            type="text"
            value={newContribution.household}
            onChange={(e) => setNewContribution({ ...newContribution, household: e.target.value })}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Số Tiền</Form.Label>
          <Form.Control
            type="text"
            value={newContribution.amount}
            onChange={(e) => setNewContribution({ ...newContribution, amount: e.target.value })}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Mục Đích</Form.Label>
          <Form.Control
            type="text"
            value={newContribution.purpose}
            onChange={(e) => setNewContribution({ ...newContribution, purpose: e.target.value })}
          />
        </Form.Group>
        <Button variant="primary" onClick={handleAddContribution}>Add Contribution</Button>
      </Form>
    </div>
  );
};

export const FeeManagement = () => {
  const [fees, setFees] = useState([
    { stt: 1, household: 'Hộ A', serviceFee: '10,000 đồng/m²', managementFee: '7,000 đồng/m²' },
  ]);
  const [newFee, setNewFee] = useState({ household: '', serviceFee: '', managementFee: '' });

  const handleAddFee = () => {
    setFees([...fees, { stt: fees.length + 1, ...newFee }]);
    setNewFee({ household: '', serviceFee: '', managementFee: '' });
  };

  const handleDeleteFee = (index: number) => {
    setFees(fees.filter((_, i) => i !== index));
  };

  return (
    <div>
      <h2>Quản lý Phí</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>STT</th>
            <th>Hộ Gia Đình</th>
            <th>Phí Dịch Vụ Chung Cư</th>
            <th>Phí Quản Lý Chung Cư</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {fees.map((fee, index) => (
            <tr key={index}>
              <td>{fee.stt}</td>
              <td>{fee.household}</td>
              <td>{fee.serviceFee}</td>
              <td>{fee.managementFee}</td>
              <td>
                <Button variant="danger" onClick={() => handleDeleteFee(index)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Form className="mt-4">
        <Form.Group>
          <Form.Label>Hộ Gia Đình</Form.Label>
          <Form.Control
            type="text"
            value={newFee.household}
            onChange={(e) => setNewFee({ ...newFee, household: e.target.value })}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Phí Dịch Vụ Chung Cư</Form.Label>
          <Form.Control
            type="text"
            value={newFee.serviceFee}
            onChange={(e) => setNewFee({ ...newFee, serviceFee: e.target.value })}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Phí Quản Lý Chung Cư</Form.Label>
          <Form.Control
            type="text"
            value={newFee.managementFee}
            onChange={(e) => setNewFee({ ...newFee, managementFee: e.target.value })}
          />
        </Form.Group>
        <Button variant="primary" onClick={handleAddFee}>Add Fee</Button>
      </Form>
    </div>
  );
};

export default FeeManagement;



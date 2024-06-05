import Dropdown from "react-bootstrap/Dropdown";
import { useDispatch, useSelector } from "react-redux";
import { logOutUser } from "../redux/slice/userSlice";
import { useNavigate } from "react-router-dom";

function UserDropdown() {
  const userState = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSignOut = () => {
    dispatch(logOutUser())
      .unwrap()
      .then(() => {
        // console.log("sss");
        navigate("/signin");
        window.location.reload();
      })
      .catch((error) => {
        console.log("error");
      });
  };
  const goProfiles = () => {
    navigate("/profiles");
  };
  return (
    <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        {JSON.parse(localStorage.getItem("user"))?.email?.charAt(0)}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item onClick={handleSignOut}>Đăng xuất</Dropdown.Item>
        <Dropdown.Item onClick={goProfiles}>Thông tin cá nhân</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default UserDropdown;

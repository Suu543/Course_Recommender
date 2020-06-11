import Account from "../../Account/Account";

const NavPopUpModal = ({ userInfo, setUserInfo, open, setOpen }) => {
  return (
    <Account
      userInfo={userInfo}
      setUserInfo={setUserInfo}
      open={open}
      setOpen={setOpen}
    />
  );
};

export default NavPopUpModal;

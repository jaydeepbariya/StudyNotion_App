import UpdateProfilePicture from "../../settings/UpdateProfilePicture";
import UpdateProfile from "../../settings/UpdateProfile";
import ChangePassword from "../../settings/ChangePassword";
import DeleteAccount from "../../settings/DeleteAccount";

const Settings = () => {
  return (
    <div className="w-full min-h-screen">
      <h1 className="w-full text-3xl my-4 text-left font-bold p-4">Settings</h1>
      <div className="w-3/5 mx-auto flex flex-col">
        <UpdateProfilePicture />
        <UpdateProfile />
        <ChangePassword />
        <DeleteAccount />
      </div>
    </div>
  );
};

export default Settings;

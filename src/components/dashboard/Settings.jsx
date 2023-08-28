import UpdateProfilePicture from "../settings/UpdateProfilePicture"
import UpdateProfile from "../settings/UpdateProfile"
import ChangePassword from '../settings/ChangePassword'
import DeleteAccount from '../settings/DeleteAccount'

const Settings = () => {

    return (
      <div className="w-11/12 flex flex-col gap-12">
        <UpdateProfilePicture />
        <UpdateProfile />
        <ChangePassword />
        <DeleteAccount />
      </div>
    )
}

export default Settings
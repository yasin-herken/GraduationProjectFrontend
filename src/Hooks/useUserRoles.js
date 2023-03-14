import {selectUser} from "../Features/user/userSlice";
import {useSelector} from "react-redux";

export const useUserRoles = () => {
  const user = useSelector(selectUser);
  return user.roles;
}
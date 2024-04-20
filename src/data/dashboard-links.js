import { USER_ROLES } from "../util/constants";

export const sidebarLinks = [
  {
    id: 1,
    name: "My Profile",
    path: "/dashboard/my-profile",
    type: null
  },
  {
    id: 2,
    name: "Dashboard",
    path: "/dashboard/instructor",
    type: USER_ROLES.INSTRUCTOR,
  },
  {
    id: 3,
    name: "My Courses",
    path: "/dashboard/my-courses",
    type: USER_ROLES.INSTRUCTOR,
  },
  {
    id: 4,
    name: "Add Course",
    path: "/dashboard/add-course",
    type: USER_ROLES.INSTRUCTOR,
  },
  {
    id: 5,
    name: "Enrolled Courses",
    path: "/dashboard/enrolled-courses",
    type: USER_ROLES.STUDENT,
  },
  {
    id: 6,
    name: "Cart",
    path: "/dashboard/cart",
    type: USER_ROLES.STUDENT,
  },
];

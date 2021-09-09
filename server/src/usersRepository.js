
const users = [];


// interface User {
//   id: String;
//   firstName: String;
//   room: string ;
//   lastName:String;
//   jobPosition:String;
//   avatar:String;
//   role:String;
// }

export const addUser = (
  id,
  firstName,
  room,
  lastName = "",
  jobPosition = "",
  avatar = "",
  role = "scrumMaster"
) => {
  const existingUser = users.find((user) => user.firstName === firstName);
  if (existingUser) return { error: "Username has already been taken" };
  if (!firstName && !room) return { error: "Username and room are required" };
  if (!firstName) return { error: "Username is required" };

  const user = { id, firstName, room, role, lastName, jobPosition, avatar };
  users.push(user);
  return { user };
};
export const getUser = (id) => {
  let user = users.find((user) => user.id == id);
  return user;
};

export const deleteUser = (id) => {
  const index = users.findIndex((user) => user.id === id);
  if (index !== -1) return users.splice(index, 1)[0];
};

export const getUsers = (room) => users.filter((user) => user.room === room);

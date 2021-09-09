// const rooms = [];

// interface room {
//   id: String;
//   issues:issue[];
//   settings: {}
// }

// export const addRoom = (id) => {
//   const room = {id}
//   rooms.push();
//   return room;
// };

// export const deleteRoom = (id) => {
//   const index = rooms.findIndex((room) => room.id === id);
//   if (index !== -1) return rooms.splice(index, 1)[0];
// };

// export const getRoom = (id) => {
//   const room = rooms.find((room) => room.id === id);
//   return room;
// }

// export const updateRoom = (data) => {
//   const index = rooms.findIndex((room) => room.id === data.id);
//   if (index < 0 ) return new Error(`Room not found`);
//   const existRoom = issues.splice(index, 1)[0];
//   const newRoom = {...existRoom,...data};
//   rooms.push(newRoom);
//   return newRoom;
// }
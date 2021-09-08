let users = []

export const addUser = (id,firstName,room,lastName = "",jobPosition = "",img = "",role = "") => {
    const existingUser = users.find(user => user.firstName === firstName)
    if (existingUser) return { error: "Username has already been taken" }
    if (!firstName && !room) return { error: "Username and room are required" }
    if (!firstName) return { error: "Username is required" }

    const user = { id, firstName, room, role, lastName, jobPosition , img }
    console.log(user)

    users.push(user)

    return {user};
}
export const getUser = id => {
    let user = users.find(user => user.id == id)
    console.log(`users: ${users}`)
    return user
}

export const deleteUser = (id) => {
    const index = users.findIndex((user) => user.id === id);
    if (index !== -1) return users.splice(index, 1)[0];
}

export const getUsers = (room) => users.filter(user => user.room === room)

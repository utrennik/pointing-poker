import { getGame } from "./gameRepository";

const issues = [];

// interface issue {

//   name: string;
//   room:string
//   priority: string;
//   active:Boolean;
//   score:number || string;
// }

export const addIssue = ({id,name,room,priority,isActive = "false",score= ""}) => {
  const {currentGame} = getGame(room);
  const existingIssue = currentGame.issues.find((issue) => issue.id === id )
  if(existingIssue) return {issueError : new Error(`Issue with current name ${name} exist`)};
  const issue = {id,name,room,priority,isActive,score}
  currentGame.issues.push(issue);
  return {issue};
}

export const getIssue = (room,id) => {
  const issue = issues.find((issue) => issue.name === name && issue.room === room)
  return {issue};
}

export const deleteIssue = (room,id) => {
  const index = issues.findIndex((issue) => issue.name === name && issue.room === room);
  if (index !== -1) return issues.splice(index, 1)[0];
}

export const updateIssue = (data,room) => {
  const index = issues.findIndex((issue) => issue.name === data.name && issue.room === data.room);
  if (index < 0 ) return new Error(`Issue not found`)

 const existIssue = issues.splice(index, 1)[0];
 const newIssue = {...existIssue,...data};
 issues.push(newIssue)
 return {newIssue};
}

export const getIssues = (room) => {
  return issues.filter((issue) => issue.room === room);
}

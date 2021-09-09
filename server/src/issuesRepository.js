const issues = [];

// interface issue {
//   name: string;
//   room:string
//   priority: string;
//   active:Boolean;
//   score:number || string;
// }

export const addIssue = (name,room,priority,isActive = "Boolean",score= "") => {
  const existingIssue = issues.find((issue) => issue.name === name && issue.room === room)
  if(existingIssue) return new Error(`Issue with current name ${name} exist`)
  const issue = {name,room,priority,isActive,score}
  issues.push(issue);
  return issue;
}

export const getIssue = (name,room) => {
  const issue = issues.find((issue) => issue.name === name && issue.room === room)
  return issue;
}

export const deleteIssue = (name,room) => {
  const index = issues.findIndex((issue) => issue.name === name && issue.room === room);
  if (index !== -1) return issues.splice(index, 1)[0];
}

export const updateIssue = (data,room) => {
  const index = issues.findIndex((issue) => issue.name === data.name && issue.room === data.room);
  if (index < 0 ) return new Error(`Issue not found`)

 const existIssue = issues.splice(index, 1)[0];
 const newIssue = {...existIssue,...data};
 issues.push(newIssue)
 return newIssue;
}

export const getIssues = (room) => {
  return issues.filter((issue) => issue.room === room);
}

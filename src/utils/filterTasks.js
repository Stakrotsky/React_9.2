export const filterTasks = (tasks, query) => {
	return tasks.filter((task) => task.text.toLowerCase().includes(query.toLowerCase()));
};

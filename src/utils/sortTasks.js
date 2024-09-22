export const sortTasks = (tasks) => {
	return [...tasks].sort((a, b) => a.text.localeCompare(b.text));
};

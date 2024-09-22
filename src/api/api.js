export const fetchTasks = async () => {
	const response = await fetch('http://localhost:3005/tasks');
	if (!response.ok) throw new Error('Ошибка при загрузке задач');
	return await response.json();
};

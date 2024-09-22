export const deleteTask = async (taskId) => {
	const response = await fetch(`http://localhost:3005/tasks/${taskId}`, {
		method: 'DELETE',
	});

	if (!response.ok) throw new Error('Ошибка при удалении задачи');
};

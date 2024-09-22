export const editTask = async (taskId, editTaskText) => {
	const response = await fetch(`http://localhost:3005/tasks/${taskId}`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ text: editTaskText }),
	});

	if (!response.ok) throw new Error('Ошибка при обновлении задачи');
	return await response.json();
};

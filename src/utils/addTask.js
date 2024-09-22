export const addTask = async (taskText) => {
	if (taskText.trim() === '') {
		throw new Error('Задача не может быть пустой');
	}

	const response = await fetch('http://localhost:3005/tasks', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ text: taskText }),
	});

	if (!response.ok) throw new Error('Ошибка при добавлении задачи');
	return await response.json();
};

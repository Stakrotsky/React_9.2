import { useState, useEffect, useRef } from 'react';
import debounce from 'lodash.debounce';
import { addTask, editTask, deleteTask, sortTasks, filterTasks } from '../utils';
import { fetchTasks } from '../api/api';

export const Tasks = () => {
	const [taskText, setTaskText] = useState('');
	const [tasks, setTasks] = useState([]);
	const [searchQuery, setSearchQuery] = useState('');
	const [isSorted, setIsSorted] = useState(false);
	const [error, setError] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [editTaskId, setEditTaskId] = useState(null);
	const [editTaskText, setEditTaskText] = useState('');

	const debouncedSearch = useRef(
		debounce((query) => {
			setSearchQuery(query);
		}, 300),
	).current;

	useEffect(() => {
		setIsLoading(true);
		fetchTasks()
			.then(setTasks)
			.catch(() => setError('Ошибка при загрузке задач'))
			.finally(() => setIsLoading(false));
	}, []);

	const handleAddTask = () => {
		addTask(taskText)
			.then((newTask) => {
				setTasks((prevTasks) => [...prevTasks, newTask]);
				setTaskText('');
				setError('');
			})
			.catch((err) => setError(err.message));
	};

	const handleEditTask = (task) => {
		setEditTaskId(task.id);
		setEditTaskText(task.text);
	};

	const handleSaveEditedTask = () => {
		editTask(editTaskId, editTaskText)
			.then((updatedTask) => {
				setTasks((prevTasks) =>
					prevTasks.map((task) =>
						task.id === editTaskId ? updatedTask : task,
					),
				);
				setEditTaskId(null);
				setEditTaskText('');
			})
			.catch((err) => setError(err.message));
	};

	const handleDeleteTask = (id) => {
		deleteTask(id)
			.then(() => {
				setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
			})
			.catch((err) => setError(err.message));
	};

	const handleSort = () => {
		setIsSorted((prevIsSorted) => !prevIsSorted);
	};

	const handleSearchChange = (e) => {
		const query = e.target.value;
		debouncedSearch(query);
	};

	const sortedTasks = isSorted ? sortTasks(tasks) : tasks;
	const filteredTasks = filterTasks(sortedTasks, searchQuery);

	return {
		taskText,
		setTaskText,
		error,
		isLoading,
		tasks: filteredTasks,
		handleAddTask,
		handleSaveEditedTask,
		handleDeleteTask,
		handleSort,
		isSorted,
		editTaskId,
		editTaskText,
		handleSearchChange,
		setEditTaskText,
		handleEditTask,
	};
};

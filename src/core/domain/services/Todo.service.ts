import { Todo } from '../models/Todo';

interface TodoService {
	getAll(): Promise<Todo[]>;
	addTodo(params: { name: string; time: string, isToday: boolean }): Promise<Todo>;
	deleteTodo(params: { id: string }): Promise<Todo>;
	updateTodo(params: { completed: boolean; id: string }): Promise<Todo>;
	filterTodayTodos(todos: Todo[]): Todo[];
	filterTomorrowTodos(todos: Todo[]): Todo[];
}

export type { TodoService };

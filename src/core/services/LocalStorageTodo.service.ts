import { Todo } from '../domain/models/Todo';
import { TodoService } from '../domain/services/Todo.service';

class LocalStorageTodoService implements TodoService {
  private COLLECTION_KEY: string;
  private __collection: Array<Todo> = [];

  constructor() {
    this.COLLECTION_KEY = 'TODO_COLLECTION';
    this.initLocalStorage();
  }

  public filterTodayTodos(todos: Todo[]): Todo[] {
    return todos.filter((todo) => {
      const today = new Date();
      const todoDate = new Date(todo.date);

      today.setHours(0, 0, 0, 0);
      todoDate.setHours(0, 0, 0, 0);

      return this.isEqualTodayDates(today, todoDate);
    });
  }

  public filterTomorrowTodos(todos: Todo[]): Todo[] {
    return todos.filter((todo) => {
      const today = new Date();
      const todoDate = new Date(todo.date);

      today.setHours(0, 0, 0, 0);
      todoDate.setHours(0, 0, 0, 0);

      return todoDate > today;
    });
  }

  public async addTodo(params: {
    name: string;
    time: string;
    isToday: boolean;
  }): Promise<Todo> {
    const newTodo: Todo = {
      id: String(Date.now()),
      completed: false,
      name: params.name,
      time: `${this.getTimeIn12Tz(params.time)} ${this.getAmOrPm(params.time)}`,
      date: params.isToday
        ? this.getTodayDate(params.time).toJSON()
        : this.getTomorrowDate(params.time).toJSON(),
    };

    this.collection = [newTodo, ...this.collection];
    return newTodo;
  }

  public async deleteTodo(params: { id: string }): Promise<Todo> {
    const deletedItem = this.collection.find((item) => item.id === params.id);
    this.collection = this.collection.filter((item) => item.id !== params.id);
    return deletedItem as Todo;
  }

  public async updateTodo(params: {
    completed: boolean;
    id: string;
  }): Promise<Todo> {
    const collection = this.collection;

    let selectedTodo: Todo | null = null;

    this.collection = collection.map((item) => {
      if (item.id === params.id) {
        selectedTodo = {
          ...item,
          completed: params.completed,
        };

        return selectedTodo;
      }

      return item;
    });

    return selectedTodo as unknown as Todo;
  }

  public async getAll(): Promise<Todo[]> {
    return this.__collection;
  }

  private initLocalStorage() {
    const collection = JSON.parse(
      localStorage.getItem(this.COLLECTION_KEY) || 'null'
    ) as Array<Todo> | null;

    if (collection === null) {
      return localStorage.setItem(this.COLLECTION_KEY, JSON.stringify([]));
    }

    this.collection = collection;
  }

  private set collection(value: Todo[]) {
    this.__collection = value;

    localStorage.setItem(
      this.COLLECTION_KEY,
      JSON.stringify(this.__collection)
    );
  }

  private get collection() {
    const collection = JSON.parse(
      localStorage.getItem(this.COLLECTION_KEY) as string
    ) as null | Todo[];

    if (!collection) return [];

    return collection;
  }

  private getTodayDate(time: string) {
    const [h, m] = time.split(':');

    const date = new Date();
    date.setHours(Number(h));
    date.setMinutes(Number(m));

    return date;
  }

  private getTomorrowDate(time: string) {
    const date = this.getTodayDate(time);
    date.setDate(date.getDate() + 1);
    return date;
  }

  private isEqualTodayDates(date: Date, dateToCompare: Date) {
    const [m1, d1] = [date.getMonth(), date.getDate()];
    const [m2, d2] = [dateToCompare.getMonth(), dateToCompare.getDate()];

    return m1 === m2 && d1 === d2;
  }

  private getAmOrPm(time: string) {
    const [h] = time.split(':');
    if (Number(h) < 12) return 'AM';
    return 'PM';
  }

  private getTimeIn12Tz(time: string) {
    const [hr, mnt] = time.split(':');
    let h = Number(hr);

    if (h >= 12) h -= 12;
    if (h === 0) h = 12;

    return `${h}:${mnt}`;
  }
}

export { LocalStorageTodoService };

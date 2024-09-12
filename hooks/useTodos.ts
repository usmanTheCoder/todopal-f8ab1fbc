import { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createTodo, deleteTodo, updateTodo } from '@/store/todoSlice';
import { RootState } from '@/store';
import { Todo } from '@/types/todo';
import { trpc } from '@/utils/trpc';
import { toast } from 'react-hot-toast';

export const useTodos = () => {
  const dispatch = useDispatch();
  const { data: todos, isLoading } = trpc.todos.getAllTodos.useQuery();
  const [isCreating, setIsCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const addTodo = useCallback(
    async (todo: Omit<Todo, 'id'>) => {
      setIsCreating(true);
      try {
        const newTodo = await dispatch(createTodo(todo)).unwrap();
        toast.success('Todo created successfully!');
        return newTodo;
      } catch (error) {
        toast.error('Failed to create todo');
        console.error(error);
      } finally {
        setIsCreating(false);
      }
    },
    [dispatch]
  );

  const removeTodo = useCallback(
    async (id: string) => {
      try {
        await dispatch(deleteTodo(id)).unwrap();
        toast.success('Todo deleted successfully!');
      } catch (error) {
        toast.error('Failed to delete todo');
        console.error(error);
      }
    },
    [dispatch]
  );

  const editTodo = useCallback(
    async (todo: Todo) => {
      setIsUpdating(true);
      try {
        const updatedTodo = await dispatch(updateTodo(todo)).unwrap();
        toast.success('Todo updated successfully!');
        return updatedTodo;
      } catch (error) {
        toast.error('Failed to update todo');
        console.error(error);
      } finally {
        setIsUpdating(false);
      }
    },
    [dispatch]
  );

  return {
    todos,
    isLoading,
    isCreating,
    isUpdating,
    addTodo,
    removeTodo,
    editTodo,
  };
};
```

This is a custom React hook called `useTodos` that provides functionality for managing todos in a todo list application. It uses the Redux Toolkit and tRPC to interact with the server and perform CRUD operations on the todos.









This hook follows best practices, such as using `useCallback` to memoize the callback functions and prevent unnecessary re-renders, and leveraging Redux Toolkit and tRPC for efficient state management and type-safe API calls. It also includes error handling and toast notifications to provide a better user experience.
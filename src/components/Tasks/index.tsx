import { Link } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";

import {
  useAddTaskMutation,
  useGetTasksQuery,
} from "../../features/api/apiSlice";

export const Tasks = () => {
  const {
    data: tasks,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetTasksQuery();

  type Inputs = {
    title: string;
    points: number;
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const [addTask] = useAddTaskMutation();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      console.log("adding task", data);
      await addTask(data);
    } catch (err) {
      console.error("Failed to save the task: ", err);
    }
  };

  let content;

  if (isLoading) {
    content = <div>Loading...</div>;
  } else if (isSuccess) {
    content = tasks.map((task: any) => (
      <p key={task.id}>
        {task.title} - {task.points}
      </p>
    ));
  } else if (isError) {
    content = <div>{error.toString()}</div>;
  }

  return (
    <section>
      <header className="App-header">
        <h1>Tasks</h1>
      </header>
      <nav>
        <Link to="/kids">Kids</Link> |<Link to="/tasks">Tasks</Link> |
        <Link to="/monsters">Monsters</Link>
      </nav>
      <section>{content}</section>
      <section>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            {...register("title", { required: "Enter task title" })}
            placeholder="title"
          />
          <input
            {...register("points", {
              valueAsNumber: true,
              required: "Enter points for task",
            })}
            placeholder="points"
          />
          <input type="submit" value="Add" />
        </form>
      </section>
    </section>
  );
};

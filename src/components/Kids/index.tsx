import { Link } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  useAddKidMutation,
  useGetKidsQuery,
} from "../../features/api/apiSlice";

export const Kids = () => {
  const {
    data: kids,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetKidsQuery();

  type Inputs = {
    firstName: string;
    lastName: string;
    monster: string;
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const [addKid] = useAddKidMutation();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      console.log("adding kid", data);
      await addKid(data);
    } catch (err) {
      console.error("Failed to save the kid: ", err);
    }
  };

  let content;

  if (isLoading) {
    content = <div>Loading...</div>;
  } else if (isSuccess) {
    content = kids.map((kid: any) => (
      <p key={kid.id}>
        {kid.firstName} - {kid.lastName} - {kid.monster}
      </p>
    ));
  } else if (isError) {
    content = <div>{error.toString()}</div>;
  }

  return (
    <section>
      <header className="App-header">
        <h1>Kids</h1>
      </header>
      <nav>
        <Link to="/kids">Kids</Link> |<Link to="/tasks">Tasks</Link> |
        <Link to="/monsters">Monsters</Link>
      </nav>
      <section>{content}</section>
      <section>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            {...register("firstName", { required: "Enter your first name" })}
            placeholder="First name"
          />
          <input
            {...register("lastName", { required: "Enter your last name" })}
            placeholder="Last name"
          />
          <select {...register("monster")}>
            <option value="0">Izzy</option>
            <option value="1">Petra</option>
            <option value="2">Opchoss</option>
            <option value="3">Izzy</option>
            <option value="4">Petra</option>
            <option value="5">Opchoss</option>
            <option value="6">Izzy</option>
            <option value="7">Petra</option>
            <option value="8">Opchoss</option>
            <option value="9">Izzy</option>
            <option value="10">Petra</option>
            <option value="11">Opchoss</option>
          </select>
          <input type="submit" value="Add" />
        </form>
      </section>
    </section>
  );
};

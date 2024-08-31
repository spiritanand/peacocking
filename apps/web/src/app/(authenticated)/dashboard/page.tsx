import CreateModel from "./CreateModel";
import PreviousModels from "./PreviousModels";

const Dashboard = () => {
  return (
    <main className="container mb-10 min-h-screen">
      <h1 className="mx-auto my-10 w-fit scroll-m-20 border-b pb-2 text-4xl font-semibold tracking-tight lg:text-5xl">
        Your <span className="font-black text-primary">supermodels</span>
      </h1>
      <CreateModel />
      <PreviousModels />
    </main>
  );
};

export default Dashboard;

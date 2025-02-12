import AddTask from "./components/AddTask";
import Navbar from "./components/Navbar";
import TaskList from "./components/TaskList";
import TaskFilter from "./components/TaskFilter";

function App() {
    return (
        <>
            <Navbar />
            <main className="container mx-auto px-2">
                <AddTask />
                <TaskFilter />
                <TaskList />
            </main>
        </>
    );
}

export default App;

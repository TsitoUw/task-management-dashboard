import AddTask from "./components/AddTask";
import Navbar from "./components/Navbar";
import TaskList from "./components/TaskList";

function App() {
    return (
        <>
            <Navbar />
            <main className="container mx-auto">
                <AddTask />
                <TaskList />
            </main>
        </>
    );
}

export default App;

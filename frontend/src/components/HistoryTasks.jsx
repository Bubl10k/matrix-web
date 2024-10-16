import Task from "./Task";

export default function HistoryTasks({ tasks, handleCancelTask, handleDeleteTask, fetchResult }) {
  return (
    <>
      {tasks.map((task) => {
        return (
          <Task
            key={task.id}
            task={task}
            handleCancelTask={handleCancelTask}
            handleDeleteTask={handleDeleteTask}
            fetchResult={fetchResult}
          />
        );
      })}
    </>
  );
}

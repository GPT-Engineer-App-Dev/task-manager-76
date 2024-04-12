import { useState } from "react";
import { Box, Input, Button, List, ListItem, ListIcon, IconButton, Checkbox, Text } from "@chakra-ui/react";
import { FaTrash, FaPlus, FaCheckCircle } from "react-icons/fa";

const Index = () => {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const handleAddTask = () => {
    if (inputValue.trim() !== "") {
      const newTask = {
        id: Date.now(),
        text: inputValue,
        isCompleted: false,
      };
      setTasks([...tasks, newTask]);
      setInputValue("");
    }
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleToggleComplete = (id) => {
    setTasks(
      tasks.map((task) => {
        if (task.id === id) {
          return { ...task, isCompleted: !task.isCompleted };
        }
        return task;
      }),
    );
  };

  return (
    <Box maxW="md" mx="auto" mt="10">
      <Box display="flex" mb="4">
        <Input placeholder="Add a new task..." value={inputValue} onChange={(e) => setInputValue(e.target.value)} onKeyPress={(e) => e.key === "Enter" && handleAddTask()} />
        <Button ml="2" colorScheme="blue" onClick={handleAddTask}>
          <FaPlus />
        </Button>
      </Box>
      <List spacing={3}>
        {tasks.map((task) => (
          <ListItem key={task.id} display="flex" alignItems="center">
            <Checkbox isChecked={task.isCompleted} onChange={() => handleToggleComplete(task.id)} mr="2" />
            <Text as={task.isCompleted ? "del" : "span"} flex="1">
              {task.text}
            </Text>
            <IconButton aria-label="Delete task" icon={<FaTrash />} onClick={() => handleDeleteTask(task.id)} colorScheme="red" />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Index;

export type StackParamList = {
  TaskList: undefined;
  AddTask: undefined;
  EditTask: { task: { id: string; name: string; dueDate: string; status: string } };
  Home: undefined;
};

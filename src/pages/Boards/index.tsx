/* eslint-disable @typescript-eslint/no-explicit-any */
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useState } from "react";
import { Board } from "../../data/board";
import { Columns, TaskT } from "../../types";
import { onDragEnd } from "../../helpers/onDragEnd";
import { AddOutline } from "react-ionicons";
import AddModal from '../../components/Models/AddModel'
import Task from "../../components/Task";
import EditModal from "../../components/Models/EditModal";

const Home = () => {
	const [columns, setColumns] = useState<Columns>(Board);
	const [modalOpen, setModalOpen] = useState(false);
	const [editModalOpen, setEditModalOpen] = useState(false);
	const [selectedColumn, setSelectedColumn] = useState("");

	const [taskToEdit, setTaskToEdit] = useState(null);
	const [selectedTask, setSelectedTask] = useState<TaskT | null>(null);

	const openModal = (columnId: any) => {
		setSelectedColumn(columnId);
		setModalOpen(true);
	};

	const openEditModal = (task:any, columnId:any) => {
		setSelectedColumn(columnId);
		setTaskToEdit(task);  // Set the task to be edited
		setEditModalOpen(true);
	};

	const closeModal = () => {
		setModalOpen(false);
	};

	const closeEditModal = () => {
		setEditModalOpen(false);
		setTaskToEdit(null);
	};

	const handleAddTask = (taskData: any) => {
				const newBoard = { ...columns };
				newBoard[selectedColumn].items.push(taskData);
	};

	const handleUpdateTask = (updatedTask: TaskT) => {
		const newBoard = { ...columns };
		const column = Object.values(newBoard).find(col =>
		  col.items.find(task => task.id === updatedTask.id)
		);
	
		if (column) {
		  const taskIndex = column.items.findIndex(task => task.id === updatedTask.id);
		  if (taskIndex !== -1) {
			column.items[taskIndex] = updatedTask;  // Update the task
			setColumns(newBoard);
			closeModal();
		  }
		}
	  };


	const handleDeleteTask = (taskId: string, columnId: string) => {
		const newColumns = { ...columns };
		newColumns[columnId].items = newColumns[columnId].items.filter(
		  (task: any) => task.id !== taskId
		);
		setColumns(newColumns);
	  };

	  const handleEditTaskClick = (task: TaskT) => {
		setSelectedTask(task);
		setEditModalOpen(true);
	  };

	return (
		<>
			<DragDropContext onDragEnd={(result: any) => onDragEnd(result, columns, setColumns)}>
				<div className="w-full flex items-start justify-between px-5 pb-8 md:gap-0 gap-10">
					{Object.entries(columns).map(([columnId, column]: any) => (
						<div
							className="w-full flex flex-col gap-0"
							key={columnId}
						>
							<Droppable
								droppableId={columnId}
								key={columnId}
							>
								{(provided: any) => (
									<div
										ref={provided.innerRef}
										{...provided.droppableProps}
										className="flex flex-col md:w-[290px] w-[250px] gap-3 items-center py-5"
									>
										<div className="flex items-center justify-center py-[10px] w-full bg-white rounded-lg shadow-sm text-[#555] font-medium text-[15px]">
											{column.name}
										</div>
										{column.items.map((task: any, index: any) => (
											<Draggable
												key={task.id.toString()}
												draggableId={task.id.toString()}
												index={index}
											>
												{(provided: any) => (
													<>
														<Task
															provided={provided}
															task={task}
						                                    // onDelete={(e)=>console.log(e)}
															onDelete={(taskId) => handleDeleteTask(taskId, columnId)}
															onEdit={handleEditTaskClick} 
														/>
													</>
												)}
											</Draggable>
										))}
										{provided.placeholder}
									</div>
								)}
							</Droppable>
							<div
								onClick={() => openModal(columnId)}
								className="flex cursor-pointer items-center justify-center gap-1 py-[10px] md:w-[90%] w-full opacity-90 bg-white rounded-lg shadow-sm text-[#555] font-medium text-[15px]"
							>
								<AddOutline color={"#555"} />
								Add Task
							</div>
						</div>
					))}
				</div>
			</DragDropContext>

			<AddModal
				isOpen={modalOpen}
				onClose={closeModal}
				setOpen={setModalOpen}
				handleAddTask={handleAddTask}
			/>

			<EditModal
				isOpen={editModalOpen}
				onClose={closeModal}
				setOpen={setEditModalOpen}
				handleEditTask={handleUpdateTask}
				taskData={selectedTask}
			/>
		</>
	);
};

export default Home;
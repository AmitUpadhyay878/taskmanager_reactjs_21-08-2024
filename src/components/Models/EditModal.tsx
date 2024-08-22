// import React, { useState, useEffect } from 'react'
// import { v4 as uuidv4 } from 'uuid'
// import { getRandomColors } from '../../helpers/getRandomColors'
// import ImageBox from '../ImageBox'
// import { Tag } from '../../types'

// interface EditModalProps {
//     isOpen: boolean
//     onClose: () => void
//     setOpen: React.Dispatch<React.SetStateAction<boolean>>
//     handleEditTask: (taskData: TaskT) => void
//     taskData: TaskT | null // Prop to receive task data for editing
// }

// interface TaskT {
//     id: string
//     title: string
//     description: string
//     priority: string
//     deadline: number
//     image: string
//     alt: string
//     tags: Tag[]
// }

// const EditModal: React.FC<EditModalProps> = ({
//     isOpen,
//     onClose,
//     setOpen,
//     handleEditTask,
//     taskData
// }) => {
//     const initialTaskData: TaskT = {
//         id: uuidv4(),
//         title: '',
//         description: '',
//         priority: '',
//         deadline: 0,
//         image: '',
//         alt: '',
//         tags: []
//     }

//     const [taskDataState, setTaskDataState] = useState<TaskT>(
//         taskData || initialTaskData
//     )
//     const [tagTitle, setTagTitle] = useState<string>('')

//     useEffect(() => {
//         if (taskData) {
//             setTaskDataState(taskData) // Prepopulate form with task data
//         }
//     }, [taskData])

//     const handleChange = (
//         e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
//     ) => {
//         const { name, value } = e.target
//         setTaskDataState({ ...taskDataState, [name]: value })
//     }

//     const handleAddTags = () => {
//         if (tagTitle.trim() !== '') {
//             const { bg, text } = getRandomColors()
//             const newTag: Tag = { title: tagTitle.trim(), bg, text }
//             setTaskDataState({
//                 ...taskDataState,
//                 tags: [...taskDataState.tags, newTag]
//             })
//             setTagTitle('')
//         }
//     }

    

//     const closeModal = () => {
//         setOpen(false)
//         onClose()
//         setTaskDataState(initialTaskData) // Reset the form when modal is closed
//     }

//     const handleSubmit = () => {
//         if (taskDataState?.title) {
//             handleEditTask(taskDataState) // Pass updated task data back to parent
//             closeModal()
//         }
//     }

//     const handleImageChange = (file: File) => {
//         const reader = new FileReader()
//         reader.onload = function (e) {
//             if (e.target) {
//                 setTaskDataState({
//                     ...taskDataState,
//                     image: e.target.result as string,
//                     alt: file.name
//                 })
//             }
//         }
//         reader.readAsDataURL(file)
//     }

//     return (
//         <div
//             className={`w-screen h-screen place-items-center fixed top-0 left-0 ${
//                 isOpen ? 'grid' : 'hidden'
//             }`}
//         >
//             <div
//                 className="w-full h-full bg-black opacity-70 absolute left-0 top-0 z-20"
//                 onClick={() => closeModal()}
//             ></div>
//             <div className="md:w-[30vw] w-[90%] bg-white rounded-lg shadow-md z-50 flex flex-col items-center gap-3 px-5 py-6">
//                 <input
//                     type="text"
//                     name="title"
//                     value={taskDataState.title}
//                     onChange={handleChange}
//                     placeholder="Title"
//                     className="w-full h-12 px-3 outline-none rounded-md bg-slate-100 border border-slate-300 text-sm font-medium"
//                 />
//                 <input
//                     type="text"
//                     name="description"
//                     value={taskDataState.description}
//                     onChange={handleChange}
//                     placeholder="Description"
//                     className="w-full h-12 px-3 outline-none rounded-md bg-slate-100 border border-slate-300 text-sm font-medium"
//                 />
//                 <select
//                     name="priority"
//                     id="priority"
//                     className="w-full h-12 cursor-pointer px-2 outline-none rounded-md bg-slate-100 border border-slate-300 text-sm"
//                     onChange={handleChange}
//                     value={taskDataState.priority}
//                 >
//                     <option value="">Priority</option>
//                     <option value="low">Low</option>
//                     <option value="medium">Medium</option>
//                     <option value="high">High</option>
//                 </select>

//                 <div className="w-full flex items-center gap-2">
//                     <input
//                         type="number"
//                         name="deadline"
//                         value={taskDataState.deadline}
//                         min={0}
//                         onChange={handleChange}
//                         placeholder="Deadline"
//                         className="flex-1 h-12 px-3 outline-none rounded-md bg-slate-100 border border-slate-300 text-sm font-medium"
//                     />
//                     <div className="text-sm font-medium text-gray-600">min</div>
//                 </div>

//                 <input
//                     type="text"
//                     value={tagTitle}
//                     onChange={(e) => setTagTitle(e.target.value)}
//                     placeholder="Tag Title"
//                     className="w-full h-12 px-3 outline-none rounded-md bg-slate-100 border border-slate-300 text-sm font-medium"
//                 />
//                 <button
//                     className="w-full rounded-md h-9 bg-slate-500 text-amber-50 font-medium"
//                     onClick={handleAddTags}
//                 >
//                     Add Tag
//                 </button>
//                 <div className="w-full">
//                     {taskDataState.tags && <span>Tags: </span>}
//                     {taskDataState.tags.map((tag, index) => (
//                         <div
//                             key={index}
//                             className="inline-block mx-1 px-[10px] py-[2px] text-[13px] font-medium rounded-md"
//                             style={{
//                                 backgroundColor: tag.bg,
//                                 color: tag.text
//                             }}
//                         >
//                             {tag.title}
//                         </div>
//                     ))}
//                 </div>
//                 <ImageBox
//                     image={taskDataState.image}
//                     onImageChange={handleImageChange}
//                 />
//                 <input
//                     type="text"
//                     name="alt"
//                     value={taskDataState.alt}
//                     onChange={handleChange}
//                     placeholder="Image Alt"
//                     className="w-full h-12 px-3 outline-none rounded-md bg-slate-100 border border-slate-300 text-sm"
//                 />
//                 <div className="flex">
//                     <button
//                         type="submit"
//                         className="w-[70%] mt-3 mx-4 rounded-md h-9 px-8 bg-orange-400 text-blue-50 font-medium"
//                         onClick={handleSubmit}
//                     >
//                         Update Task
//                     </button>
//                     <button
//                         type="button"
//                         className="w-[30%] mt-3 mx-4 rounded-md h-9 px-4 bg-red-400 text-blue-50 font-medium"
//                         onClick={closeModal}
//                     >
//                         Cancel
//                     </button>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default EditModal



import React, { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { getRandomColors } from '../../helpers/getRandomColors'
import ImageBox from '../ImageBox'
import { TagSS } from '../../types'
import {PencilOutline, TrashOutline } from "react-ionicons";

interface EditModalProps {
    isOpen: boolean
    onClose: () => void
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    handleEditTask: (taskData: TaskT) => void
    taskData: TaskT | null // Prop to receive task data for editing
}

interface TaskT {
    id: string
    title: string
    description: string
    priority: string
    deadline: number
    image: string
    alt: string
    tags: TagSS[]
}

const EditModal: React.FC<EditModalProps> = ({
    isOpen,
    onClose,
    setOpen,
    handleEditTask,
    taskData
}) => {
    const initialTaskData: TaskT = {
        id: uuidv4(),
        title: '',
        description: '',
        priority: '',
        deadline: 0,
        image: '',
        alt: '',
        tags: []
    }

    const [taskDataState, setTaskDataState] = useState<TaskT>(
        taskData || initialTaskData
    )
    const [tagTitle, setTagTitle] = useState<string>('')
    const [editingTagIndex, setEditingTagIndex] = useState<number | null>(null)

    useEffect(() => {
        if (taskData) {
            setTaskDataState(taskData) // Prepopulate form with task data
        }
    }, [taskData])

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target
        setTaskDataState({ ...taskDataState, [name]: value })
    }

    const handleAddOrUpdateTag = () => {
        if (tagTitle.trim() !== '') {
            const { bg, text } = getRandomColors()
            if (editingTagIndex !== null) {
                const updatedTags = [...taskDataState.tags]
                updatedTags[editingTagIndex] = { ...updatedTags[editingTagIndex], title: tagTitle.trim(), bg, text }
                setTaskDataState({ ...taskDataState, tags: updatedTags })
                setEditingTagIndex(null)
            } else {
                const newTag: TagSS = { title: tagTitle.trim(), bg, text }
                setTaskDataState({
                    ...taskDataState,
                    tags: [...taskDataState.tags, newTag]
                })
            }
            setTagTitle('')
        }
    }

    const handleEditTag = (index: number) => {
        setTagTitle(taskDataState.tags[index].title)
        setEditingTagIndex(index)
    }

    const handleRemoveTag = (index: number) => {
        const updatedTags = taskDataState.tags.filter((_, i) => i !== index)
        setTaskDataState({ ...taskDataState, tags: updatedTags })
    }

    const closeModal = () => {
        setOpen(false)
        onClose()
        setTaskDataState(initialTaskData) // Reset the form when modal is closed
    }

    const handleSubmit = () => {
        if (taskDataState?.title) {
            handleEditTask(taskDataState) // Pass updated task data back to parent
            closeModal()
        }
    }

    const handleImageChange = (file: File) => {
        const reader = new FileReader()
        reader.onload = function (e) {
            if (e.target) {
                setTaskDataState({
                    ...taskDataState,
                    image: e.target.result as string,
                    alt: file.name
                })
            }
        }
        reader.readAsDataURL(file)
    }

    return (
        <div
            className={`w-screen h-screen place-items-center fixed top-0 left-0 ${
                isOpen ? 'grid' : 'hidden'
            }`}
        >
            <div
                className="w-full h-full bg-black opacity-70 absolute left-0 top-0 z-20"
                onClick={() => closeModal()}
            ></div>
            <div className="md:w-[30vw] w-[90%] bg-white rounded-lg shadow-md z-50 flex flex-col items-center gap-3 px-5 py-6">
                <input
                    type="text"
                    name="title"
                    value={taskDataState.title}
                    onChange={handleChange}
                    placeholder="Title"
                    className="w-full h-12 px-3 outline-none rounded-md bg-slate-100 border border-slate-300 text-sm font-medium"
                />
                <input
                    type="text"
                    name="description"
                    value={taskDataState.description}
                    onChange={handleChange}
                    placeholder="Description"
                    className="w-full h-12 px-3 outline-none rounded-md bg-slate-100 border border-slate-300 text-sm font-medium"
                />
                <select
                    name="priority"
                    id="priority"
                    className="w-full h-12 cursor-pointer px-2 outline-none rounded-md bg-slate-100 border border-slate-300 text-sm"
                    onChange={handleChange}
                    value={taskDataState.priority}
                >
                    <option value="">Priority</option>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                </select>

                <div className="w-full flex items-center gap-2">
                    <input
                        type="number"
                        name="deadline"
                        value={taskDataState.deadline}
                        min={0}
                        onChange={handleChange}
                        placeholder="Deadline"
                        className="flex-1 h-12 px-3 outline-none rounded-md bg-slate-100 border border-slate-300 text-sm font-medium"
                    />
                    <div className="text-sm font-medium text-gray-600">min</div>
                </div>

                <input
                    type="text"
                    value={tagTitle}
                    onChange={(e) => setTagTitle(e.target.value)}
                    placeholder="Tag Title"
                    className="w-full h-12 px-3 outline-none rounded-md bg-slate-100 border border-slate-300 text-sm font-medium"
                />
                <button
                    className="w-full rounded-md h-9 bg-slate-500 text-amber-50 font-medium"
                    onClick={handleAddOrUpdateTag}
                >
                    {editingTagIndex !== null ? 'Update Tag' : 'Add Tag'}
                </button>
                <div className="w-full">
                    {taskDataState.tags && <span>Tags: </span>}
                    {taskDataState.tags.map((tag, index) => (
                        <div
                            key={index}
                            className="inline-flex items-center gap-2 mx-1 px-[10px] py-[2px] text-[13px] font-medium rounded-md"
                            style={{
                                backgroundColor: tag.bg,
                                color: tag.text
                            }}
                        >
                            {tag.title}
                            <button
                                onClick={() => handleEditTag(index)}
                                className=" top-1 right-1 text-xs text-blue-500"
                            >
                                <PencilOutline height={"18px"} width={"18px"} />
                            </button>
                            <button
                                onClick={() => handleRemoveTag(index)}
                                className=" top-1 right-6 text-xs text-red-500"
                            >
                              <TrashOutline height={"18px"} width={"18px"} />
                            </button>
                        </div>
                    ))}
                </div>
                <ImageBox
                    image={taskDataState.image}
                    onImageChange={handleImageChange}
                />
                <input
                    type="text"
                    name="alt"
                    value={taskDataState.alt}
                    onChange={handleChange}
                    placeholder="Image Alt"
                    className="w-full h-12 px-3 outline-none rounded-md bg-slate-100 border border-slate-300 text-sm"
                />
                <div className="flex">
                    <button
                        type="submit"
                        className="w-[70%] mt-3 mx-4 rounded-md h-9 px-8 bg-orange-400 text-blue-50 font-medium"
                        onClick={handleSubmit}
                    >
                        Update Task
                    </button>
                    <button
                        type="button"
                        className="w-[30%] mt-3 mx-4 rounded-md h-9 px-4 bg-red-400 text-blue-50 font-medium"
                        onClick={closeModal}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    )
}

export default EditModal


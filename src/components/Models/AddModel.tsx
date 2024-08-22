import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { getRandomColors } from '../../helpers/getRandomColors';
import ImageBox from '../ImageBox'
import {Tag} from '../../types'

interface Tag {
  title: string;
  bg: string;
  text: string;
}

interface AddModelProps {
  isOpen: boolean;
  onClose: () => void;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleAddTask: (taskData: any) => void;
}

const AddModel: React.FC<AddModelProps> = ({ isOpen, onClose, setOpen, handleAddTask }) => {
  const initialTaskData = {
    id: uuidv4(),
    title: "",
    description: "",
    priority: "",
    deadline: 0,
    image: "",
    alt: "",
    tags: [] as Tag[]
  };

  const [taskData, setTaskData] = useState(initialTaskData);
  const [tagTitle, setTagTitle] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setTaskData({ ...taskData, [name]: value });
  };

  const handleImageChange = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target) {
        setTaskData({ ...taskData, image: e.target.result as string, alt: file.name });
      }
    };
    reader.readAsDataURL(file);
  };

  const handleAddTags = () => {
    if (tagTitle.trim() !== "") {
      const { bg, text } = getRandomColors();
      const newTag: Tag = { title: tagTitle.trim(), bg, text };
      setTaskData({ ...taskData, tags: [...taskData.tags, newTag] });
      setTagTitle("");
    }
  };

  const closeModal = () => {
    setOpen(false);
    onClose();
    setTaskData(initialTaskData);
  };

  const handleSubmit = () => {
    if (taskData?.title) {
      handleAddTask(taskData);
      closeModal();
    }
  };

  return (
    <div
      className={`w-screen h-screen place-items-center fixed top-0 left-0 ${isOpen ? 'grid' : 'hidden'}`}
    >
      <div
        className="w-full h-full bg-black opacity-70 absolute left-0 top-0 z-20"
        onClick={closeModal}
      ></div>
      <div className="md:w-[30vw] w-[90%] bg-white rounded-lg shadow-md z-50 flex flex-col items-center gap-3 px-5 py-6">
        <input
          type="text"
          name="title"
          value={taskData.title}
          onChange={handleChange}
          placeholder="Title"
          className="w-full h-12 px-3 outline-none rounded-md bg-slate-100 border border-slate-300 text-sm font-medium"
        />
        <input
          type="text"
          name="description"
          value={taskData.description}
          onChange={handleChange}
          placeholder="Description"
          className="w-full h-12 px-3 outline-none rounded-md bg-slate-100 border border-slate-300 text-sm font-medium"
        />
        <select
          name="priority"
          id="priority"
          className="w-full h-12 cursor-pointer px-2 outline-none rounded-md bg-slate-100 border border-slate-300 text-sm"
          onChange={handleChange}
          value={taskData.priority}
        >
          <option value="">Priority</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <input
          type="number"
          name="deadline"
          value={taskData.deadline}
          min={0}
          onChange={handleChange}
          placeholder="Deadline"
          className="w-full h-12 px-3 outline-none rounded-md bg-slate-100 border border-slate-300 text-sm font-medium"
        />
        <input
          type="text"
          value={tagTitle}
          onChange={(e) => setTagTitle(e.target.value)}
          placeholder="Tag Title"
          className="w-full h-12 px-3 outline-none rounded-md bg-slate-100 border border-slate-300 text-sm font-medium"
        />
        <button
          className="w-full rounded-md h-9 bg-slate-500 text-amber-50 font-medium"
          onClick={handleAddTags}
        >
          Add Tag
        </button>
        <div className="w-full">
          {taskData.tags.length > 0 && <span>Tags: </span>}
          {taskData.tags.map((tag, index) => (
            <div
              key={index}
              className="inline-block mx-1 px-[10px] py-[2px] text-[13px] font-medium rounded-md"
              style={{
                backgroundColor: tag.bg,
                color: tag.text
              }}
            >
              {tag.title}
            </div>
          ))}
        </div>
        <ImageBox
          image={taskData.image}
          onImageChange={handleImageChange}
        />
        <input
          type="text"
          name="alt"
          value={taskData.alt}
          onChange={handleChange}
          placeholder="Image Alt"
          className="w-full h-12 px-3 outline-none rounded-md bg-slate-100 border border-slate-300 text-sm"
        />
        <div className='flex'>
          <button
            type="button"
            className='w-[70%] mt-3 mx-4 rounded-md h-9 px-8 bg-orange-400 text-blue-50 font-medium'
            onClick={handleSubmit}
          >
            Submit Task
          </button>
          <button
            type="button"
            className='w-[30%] mt-3 mx-4 rounded-md h-9 px-4 bg-red-400 text-blue-50 font-medium'
            onClick={closeModal}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddModel;



// import React, { useState } from 'react';
// import ImageBox from '../ImageBox'; 
// import { Tag } from '../../types';
// import { getRandomColors } from '../../helpers/getRandomColors';

// interface EditModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   setOpen: React.Dispatch<React.SetStateAction<boolean>>;
//   handleEditTask: (taskData: any) => void;
//   taskData: any; // Update with your actual task type if necessary
// }

// const EditModal: React.FC<EditModalProps> = ({ isOpen, onClose, setOpen, handleEditTask, taskData }) => {
//   const [editedTaskData, setEditedTaskData] = useState(taskData);
//   const [tagTitle, setTagTitle] = useState("");
//   const [editingTagIndex, setEditingTagIndex] = useState<number | null>(null);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//     const { name, value } = e.target;
//     setEditedTaskData({ ...editedTaskData, [name]: value });
//   };

//   const handleImageChange = (file: File) => {
//     const reader = new FileReader();
//     reader.onload = (e) => {
//       if (e.target) {
//         setEditedTaskData({ ...editedTaskData, image: e.target.result as string, alt: file.name });
//       }
//     };
//     reader.readAsDataURL(file);
//   };

//   const handleAddTags = () => {
//     if (tagTitle.trim() !== "") {
//       const { bg, text } = getRandomColors();
//       const newTag: Tag = { title: tagTitle.trim(), bg, text };
//       if (editingTagIndex !== null) {
//         // Update existing tag
//         const updatedTags = [...editedTaskData.tags];
//         updatedTags[editingTagIndex] = newTag;
//         setEditedTaskData({ ...editedTaskData, tags: updatedTags });
//         setEditingTagIndex(null);
//       } else {
//         // Add new tag
//         setEditedTaskData({ ...editedTaskData, tags: [...editedTaskData.tags, newTag] });
//       }
//       setTagTitle("");
//     }
//   };

//   const handleEditTag = (index: number) => {
//     setTagTitle(editedTaskData.tags[index].title);
//     setEditingTagIndex(index);
//   };

//   const handleRemoveTag = (index: number) => {
//     const updatedTags = editedTaskData.tags.filter((_, i) => i !== index);
//     setEditedTaskData({ ...editedTaskData, tags: updatedTags });
//   };

//   const closeModal = () => {
//     setOpen(false);
//     onClose();
//   };

//   const handleSubmit = () => {
//     if (editedTaskData.title) {
//       handleEditTask(editedTaskData);
//       closeModal();
//     }
//   };

//   return (
//     <div
//       className={`w-screen h-screen place-items-center fixed top-0 left-0 ${isOpen ? 'grid' : 'hidden'}`}
//     >
//        <div
//         className="w-full h-full bg-black opacity-70 absolute left-0 top-0 z-20"
//         onClick={closeModal}
//       ></div>
//       <div className="md:w-[30vw] w-[90%] bg-white rounded-lg shadow-md z-50 flex flex-col items-center gap-3 px-5 py-6">
//         <input
//           type="text"
//           name="title"
//           value={editedTaskData?.title}
//           onChange={handleChange}
//           placeholder="Title"
//           className="w-full h-12 px-3 outline-none rounded-md bg-slate-100 border border-slate-300 text-sm font-medium"
//         />
//         <input
//           type="text"
//           name="description"
//           value={editedTaskData?.description}
//           onChange={handleChange}
//           placeholder="Description"
//           className="w-full h-12 px-3 outline-none rounded-md bg-slate-100 border border-slate-300 text-sm font-medium"
//         />
//         <select
//           name="priority"
//           id="priority"
//           className="w-full h-12 cursor-pointer px-2 outline-none rounded-md bg-slate-100 border border-slate-300 text-sm"
//           onChange={handleChange}
//           value={editedTaskData?.priority}
//         >
//           <option value="">Priority</option>
//           <option value="low">Low</option>
//           <option value="medium">Medium</option>
//           <option value="high">High</option>
//         </select>


// <div className="w-full flex items-center gap-2">
//   <input
//     type="number"
//     name="deadline"
//     value={editedTaskData?.deadline}
//     min={0}
//     onChange={handleChange}
//     placeholder="Deadline"
//     className="flex-1 h-12 px-3 outline-none rounded-md bg-slate-100 border border-slate-300 text-sm font-medium"
//   />
//   <div className="text-sm font-medium text-gray-600">min</div>
// </div>







//         <input
//           type="text"
//           value={tagTitle}
//           onChange={(e) => setTagTitle(e.target.value)}
//           placeholder="Tag Title"
//           className="w-full h-12 px-3 outline-none rounded-md bg-slate-100 border border-slate-300 text-sm font-medium"
//         />
//         <button
//           className="w-full rounded-md h-9 bg-slate-500 text-amber-50 font-medium"
//           onClick={handleAddTags}
//         >
//           {editingTagIndex !== null ? 'Update Tag' : 'Add Tag'}
//         </button>
//         <div className="w-full">
//           {editedTaskData?.tags?.length > 0 && <span>Tags: </span>}
//           {editedTaskData?.tags?.map((tag:any, index:any) => (
//             <div
//               key={index}
//               className="inline-block mx-1 px-[10px] py-[2px] text-[13px] font-medium rounded-md"
//               style={{
//                 backgroundColor: tag.bg,
//                 color: tag.text
//               }}
//             >
//               {tag?.title}
//               <button onClick={() => handleEditTag(index)} className="ml-2 text-blue-500">Edit</button>
//               <button onClick={() => handleRemoveTag(index)} className="ml-2 text-red-500">Remove</button>
//             </div>
//           ))}
//         </div>
//         <ImageBox
//           image={editedTaskData?.image}
//           onImageChange={handleImageChange}
//         />
//         <input
//           type="text"
//           name="alt"
//           value={editedTaskData?.alt}
//           onChange={handleChange}
//           placeholder="Image Alt"
//           className="w-full h-12 px-3 outline-none rounded-md bg-slate-100 border border-slate-300 text-sm"
//         />
//         <div className='flex'>
//           <button
//             type="button"
//             className='w-[70%] mt-3 mx-4 rounded-md h-9 px-8 bg-orange-400 text-blue-50 font-medium'
//             onClick={handleSubmit}
//           >
//             Save Changes
//           </button>
//           <button
//             type="button"
//             className='w-[30%] mt-3 mx-4 rounded-md h-9 px-4 bg-red-400 text-blue-50 font-medium'
//             onClick={closeModal}
//           >
//             Cancel
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EditModal;

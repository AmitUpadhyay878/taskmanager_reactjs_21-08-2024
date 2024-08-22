import { TimeOutline,CloseOutline } from "react-ionicons";
import { TaskT } from "../../types"

interface TaskProps{
  task:TaskT;
  provided:any;
  onDelete: (taskId: string) => void;
  onEdit: (task: TaskT) => void; 
}

const Task = ({task,provided,onDelete,onEdit}:TaskProps) => {

  const { title, description, priority, deadline, image, alt, tags, id } = task;

  return (
    <div 
    ref={provided?.innerRef}
    {...provided.draggableProps}
    {...provided.dragHandleProps}
    className="w-full cursor-grab flex flex-col justify-between gap-3 bg-white  items-start shadow-sm rounded px-3 py-4"
    onClick={() => onEdit(task)}
    >
      {/* <div className="justify-evenly"> */}
      {/* <button
        className="top-2 right-2 text-gray-700 rounded-full p-1  transition-colors"
        onClick={() => onEdit(task)}
      >
       Edit
      </button> */}
      <button
        className="top-2 right-2 bg-amber-600 text-gray-700 rounded-[50%] p-1 hover:bg-amber-400 transition-colors"
        onClick={() => onDelete(id)} // Handle delete action
      >
        <CloseOutline color={"#666"} width={"12px"} height={"12px"} style={{color:"white"}} />
      </button>

    
      {/* </div> */}

    {image && alt && (<img src={image} alt={alt} className="w-full h-[170px] rounded-lg" />)}
    <div className="flex items-center gap-2 max-w-full flex-wrap">
      {
        tags.map((tag)=>{
          return(
              <span key={tag?.title} className={`px-[10px] py-[2px] text-[13px] font-medium rounded-md`}
              style={{ backgroundColor: tag.bg, color: tag.text }}
              >
                  {tag?.title}
              </span>
          )
        })
      }
    </div>
        <div className="w-full flex items-start flex-col">
          <span className="text-[15.5px] font-medium text-[#555]">{title}</span>
          <span className="text-[13.5px] text-gray-500">{description}</span>
        </div>
        <div className="w-full border border-dashed"></div>
        <div className="w-full flex items-center justify-between">
          <div className="flex items-center gap-1 ">
            <TimeOutline color={"#666"} width={"19px"} height={"19px"} />
            <span className="text-[13px] text-gray-700">{deadline} mins</span>
          </div>
          <div className={`w-[60px] rounded-full h-[5px] ${priority ==="high" ? 'bg-red-500' : priority === "medium"? 'bg-orange-500':'bg-blue-500'}`}></div>
        </div>
     </div>
  )
}

export default Task

import { useState } from 'react';
import {v4 as uuidv4} from 'uuid'
import { getRandomColors } from '../../helpers/getRandomColors';
// import { useForm } from 'react-hook-form';


interface Tag{
    title:string;
    bg:string;
    text:string;
}

interface AddModalProps{
isOpen:boolean;
onClose:()=>void;
setOpen:React.Dispatch<React.SetStateAction<boolean>>;
handleAddTask:(taskData:any)=> void;

}

const AddModel = ({isOpen,onClose,setOpen,handleAddTask}:AddModalProps) => {

    const initalTaskData = {
        id: uuidv4(),
        title:"",
        description:"",
        priority:"",
        deadline:0,
        image:"",
        alt:"",
        tags:[] as Tag[]
    }

    // const {register,handleSubmit,watch,formState:{errors}} = useForm({
    //     defaultValues:initalTaskData
    // })



    const[taskData,setTaskData] = useState(initalTaskData)
    const[tagTitle,setTagTitle] = useState("")


    const handleChange =(e:any)=>{
            const {name,value} =e.target

            setTaskData({...taskData,[name]:value})
    }

    const handleImageChange =(e:any)=>{
            if(e.target.files && e.target.files[0]){
                const reader = new FileReader()

                reader.onload=function(e){
                    if(e.target){
                        setTaskData({...taskData,image:e.target.result as string})
                    }
                }
                reader.readAsDataURL(e.target.files[0])
            }
}

        const handleAddTags=()=>{
           
               if(tagTitle.trim() !== ""){
                const{bg,text} =getRandomColors() 

                const newTag:Tag ={title:tagTitle.trim(),bg,text}

                setTaskData({...taskData,tags:[...taskData.tags,newTag]})
                setTagTitle("")
               }
        }

        const closeModal = ()=>{
            setOpen(false)
            onClose()
            setTaskData(initalTaskData)
        }


        const handleSubmit=()=>{
            if(taskData?.title){
                handleAddTask(taskData)
                closeModal()
            }
        }
        
        // const handleData=(taskData:any)=>{
        //     if(taskData?.title){
        //         handleAddTask(taskData)
        //         closeModal()
        //     }
        // }

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
            {/* <form onSubmit={handleSubmit(handleData)}> */}
              <input
                  type="text"
                  name="title"
                  value={taskData?.title}
                  onChange={handleChange}
                  placeholder="Title"
                  className="w-full h-12 px-3 outline-none rounded-md bg-slate-100 border border-slate-300 text-sm font-medium"
              />
              <input
                  type="text"
                  name="description"
                  value={taskData?.description}
                  onChange={handleChange}
                  placeholder="Description"
                  className="w-full h-12 px-3 outline-none rounded-md bg-slate-100 border border-slate-300 text-sm font-medium"
              />

              <select
                  name="priority"
                  id="priority"
                  className="w-full h-12 cursor-pointer px-2 outline-none rounded-md bg-slate-100 border  border-slate-300 text-sm"
                  onChange={handleChange}
                  value={taskData?.priority}
              >
                  <option value="">Priority</option>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
              </select>

              <input
                  type="number"
                  name="deadline"
                  value={taskData?.deadline}
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
                  {taskData?.tags && <span>Tags: </span>}
                  {taskData?.tags?.map((tag, index) => {
                      return (
                          <div
                              key={index}
                              className="inline-block mx-1 px-[10px] py-[2px] text-[13px] font-medium rounded-md"
                              style={{
                                  backgroundColor: tag.bg,
                                  color: tag.text
                              }}
                          >
                              {tag?.title}
                          </div>
                      )
                  })}
              </div>

              <div className="w-full flex items-center gap-4 justify-between">
              <input
                      type="file"
                      name="image"
                      onChange={handleImageChange}
                      className="w-full"
                  />
                  <input
                      type="text"
                      name="alt"
                      value={taskData?.alt}
                      min={0}
                      onChange={handleChange}
                      placeholder="Image Alt"
                      className="w-full h-12 px-3 outline-none rounded-md bg-slate-100 border border-slate-300 text-sm"
                  />
             
              </div>

              <div className='flex'>
              <button type="submit" className='w-[70%] mt-3 mx-4 rounded-md h-9 px-8 bg-orange-400 text-blue-50 font-medium'
               onClick={handleSubmit}
               >Submit Task</button>
              <button type="button" className='w-[30%] mt-3 mx-4 rounded-md h-9 px-4 bg-red-400 text-blue-50 font-medium' onClick={closeModal}>Cancel</button>
              </div>
            {/* </form> */}
          </div>
      </div>
  )
}

export default AddModel
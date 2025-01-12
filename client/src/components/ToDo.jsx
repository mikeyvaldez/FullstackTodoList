import PropTypes from "prop-types";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";

export default function ToDo({ text, updateMode }) {
  return (
    <div className="flex flex-wrap bg-blue-700 text-white mt-4 px-12 gap-2 justify-between rounded">
      <div className="text-center text-xl mb-2">{text}</div>   
      <div className="flex mt-1">
        <BiEdit className="text-xl cursor-pointer hover:text-[#1bd9e7]" onClick={updateMode}  />
        <AiFillDelete className="text-xl cursor-pointer hover:text-[red]" />      
        </div>   
    </div>
  );
}

ToDo.propTypes = {
  text: PropTypes.string,
  updateMode: PropTypes.function,
  // deleteTodo: PropTypes.function,
};

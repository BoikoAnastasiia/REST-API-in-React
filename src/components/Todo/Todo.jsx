import '../ToDoList/ToDoList.scss';
import IconButton from '../IconButton';
import { ReactComponent as DeleteIcon } from '../../icons/delete.svg';

const Todo = ({ text, onToggleCompleted, onDeleteToDo, completed }) => {
  return (
    <div>
      <input
        type="checkbox"
        className="TodoList__checkbox"
        checked={completed}
        onChange={onToggleCompleted}
      />
      <p className="TodoList__text">{text} </p>
      {/* <button type="button" className="TodoList__btn" onClick={onDeleteToDo}> */}
      {/*           
        -
      </button> */}
      <IconButton>
        <DeleteIcon
          width="12"
          height="12"
          fill="white"
          onClick={onDeleteToDo}
        />
      </IconButton>
    </div>
  );
};
export default Todo;

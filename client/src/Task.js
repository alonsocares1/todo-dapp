import './Task.css';
import RemoveIcon from "@mui/icons-material/Remove";
import {List, ListItem, ListItemAvatar, ListItemText} from "@mui/material";

const Task = ({taskText, onClick}) => {
  return (
    <List className="todo__list">
      <ListItem>
        <ListItemText primary={taskText} />
      </ListItem> 
      <RemoveIcon fontSize="large" style={{opacity:0.7}} onClick={onClick} /> 
    </List>
  )
};

export default Task;

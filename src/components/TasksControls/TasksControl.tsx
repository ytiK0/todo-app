import style from "./tasksControl.module.css"
import {capitalize} from "../../utils/capitalize.ts";
import {clx} from "../../utils/clx.ts";

interface TasksControlProps {
  activeCount: number;
  filter: Filter;
  onFilterChange: (filter: Filter) => void;
  onCompletedDelete: () => void;
}

const filterFields: Filter[] = ["all", "active", "done"]

export default function TasksControl({ activeCount, filter, onFilterChange, onCompletedDelete }: TasksControlProps) {
  return (
    <div className={style.controlWrapper}>
      <span data-testid={"active-tasks"}>{activeCount} active tasks</span>
      <div className={style.filterLabelContainer} >
        {
          filterFields.map(field => (
             <label key={field} className={clx(style.filterLabel)} htmlFor={field}>
              <input
                type="radio"
                name='filter'
                id={field}
                value={field}
                checked={filter === field}
                onChange={() => onFilterChange(field)}
                data-testid={`filter-${field}`}
              />
              <span>{capitalize(field)}</span>
            </label>
          ))
        }
      </div>
      <button
        type="button"
        data-testid="clear-completed"
        className={style.completeDeleteButton}
        onClick={onCompletedDelete}
      >
        Clear completed
      </button>
    </div>
  );
}

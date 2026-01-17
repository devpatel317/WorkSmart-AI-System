from state.agent_state import AgentState,EmployeeSnapshot
from tools.user_tool import get_all_employees
from tools.task_tool import get_tasks_for_employee
from tools.activity_tool import get_last_activity_days
from datetime import datetime,timezone

def parse_deadline(deadline_str: str) -> datetime:
    dt = datetime.fromisoformat(deadline_str.replace("Z", "+00:00"))

    # Force UTC if timezone missing
    if dt.tzinfo is None:
        dt = dt.replace(tzinfo=timezone.utc)

    return dt

def observer_agent(state : AgentState) -> dict:
    
    """
    Observer Agent:
    - Collects factual system data
    - Builds EmployeeSnapshot for each employee
    - Stores snapshots in shared state
    """

    employee_snapshots: list[EmployeeSnapshot] = []
    employees = get_all_employees()
    now = datetime.now(timezone.utc)

    for emp in employees:
        employee_id = emp["id"]

        tasks = get_tasks_for_employee(employee_id)

        total_tasks = len(tasks)
        in_progress = sum(1 for t in tasks if t["status"] == "in_progress" or t["status"] == "pending")
        
        overdue = sum(
            1 for t in tasks
            if t["status"] != "completed"
            and parse_deadline(t["deadline"]) < now
        )

        last_activity_days = get_last_activity_days(employee_id)

        snapshot: EmployeeSnapshot = {
            "employee_id":employee_id,
            "total_tasks":total_tasks,
            "in_progress_tasks":in_progress,
            "overdue_tasks":overdue,
            "last_active_days":last_activity_days
        }

        employee_snapshots.append(snapshot)
        # print("snapshot", snapshot)

    return{
        **state,
        "employee_snapshots" : employee_snapshots
    }
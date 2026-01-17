from typing import List,Dict,Optional,TypedDict
# from pydantic import BaseModel,Field

class EmployeeSnapshot(TypedDict):
    employee_id: str
    total_tasks: int
    in_progress_tasks: int
    overdue_tasks: int
    last_active_days: int

class BurnoutAssessment(TypedDict):
    employee_id: str
    risk_level: str
    explanation: str

class OptimizationDecision(TypedDict):
    employee_id: str
    recommendation: str 
    justification: str

class ExecutedAction(TypedDict):
    employee_id: str
    action: str
    status: str  # pending_approval | approved | rejected | executed | blocked
    allowed : bool
    approver_roles : list
    justification : str
    risk : str


class AgentState(TypedDict):
    employee_snapshots: List[EmployeeSnapshot] 
    burnout_assessments: List[BurnoutAssessment] 
    optimization_decisions: List[OptimizationDecision] 
    executed_actions: List[ExecutedAction] 
    burnout_detected: bool
    # approval_required : bool
    # approval_decisions : Optional[dict]
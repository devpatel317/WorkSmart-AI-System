from state.agent_state import AgentState
from state.agent_state import ExecutedAction
from tools.system_actions import (
    reassign_tasks,
    reduce_load,
    recommend_break,
    delay_deadlines
)
from agents.policy import POLICY_RULES
# from services.approval_client import send_for_approval


def policy_guard_agent(state : AgentState) -> AgentState:
    reviewed_actions = [] 
    approval_required = False

    for decision in state["optimization_decisions"]:
        action = decision["recommendation"]
        employee_id = decision["employee_id"]

        policy = POLICY_RULES.get(action)

        if not policy:
            reviewed_actions.append({
                "employee_id": employee_id,
                "action": action,
                "status": "blocked",
                "approver_roles" : [],
                "allowed": False,       
                "risk" : "unknown",
                "reason": "No policy defined for this action"
            })
            continue

        needs_approval = policy["risk"] in ["high","medium"]

        reviewed_actions.append({
            "employee_id" : employee_id,
            "action" : action,
            "status" : "pending_approval" if needs_approval else "approved",
            "allowed": not needs_approval,
            "approver_roles": policy["roles"] if needs_approval else [],
            "risk": policy["risk"],
            "justification": decision["justification"]
        })

        if needs_approval:
            approval_required = True

    state["executed_actions"] = reviewed_actions
    state["approval_required"] = approval_required

    # If approval needed, create an approval request and persist the workflow snapshot
    # if approval_required:
    #     try:
    #         request_id = send_for_approval(state)
    #         state["approval_request_id"] = request_id
    #     except Exception as e:
    #         # if sending fails, keep approval_required True so troubleshooting can occur
    #         print("[POLICY GUARD] failed to send approval request:", e)

    return state
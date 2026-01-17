from state.agent_state import AgentState,BurnoutAssessment
from langchain.chat_models import init_chat_model

def burnout_predictor_agent(state : AgentState) -> AgentState:
    burnout_found = False
    assessments : list[BurnoutAssessment] = []

    for snapshot in state["employee_snapshots"]:
        print("snapshot",snapshot)
        prompt = f"""
Analyze burnout risk for the employee below.

Employee ID: {snapshot["employee_id"]}
Total tasks: {snapshot["total_tasks"]}
Tasks in progress: {snapshot["in_progress_tasks"]}
Overdue tasks: {snapshot["overdue_tasks"]}
Days since last activity: {snapshot["last_active_days"]}

Respond in ONE sentence.
Mention risk level as LOW, MEDIUM, or HIGH.
Explain briefly why.
"""
        llm = init_chat_model("groq:llama-3.3-70b-versatile")
        result = llm.invoke(prompt)
        response = result.content
        print("Burnout response", response)

        if "high" in response or "HIGH" in response:
            risk = "high"
            burnout_found = True
        elif "medium" in response or "MEDIUM" in response:
            risk = "medium"
        else:
            risk = "low"

        assessment : BurnoutAssessment = {
            "employee_id" : snapshot["employee_id"],
            "risk_level" : risk,
            "explanation" : response
        }

        assessments.append(assessment)

    state["burnout_assessments"] = assessments
    state["burnout_detected"] = burnout_found

    return state

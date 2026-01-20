from state.agent_state import AgentState,OptimizationDecision
from langchain.chat_models import init_chat_model

def workforce_optimizer_agent(state : AgentState) -> AgentState:
    decisions = []
 
    print("Workforce Optimizer Agent Invoked")
    for assessment in state["burnout_assessments"]:
        if assessment["risk_level"] == "low" or assessment["risk_level"] == "medium":
            continue

        prompt = f"""
    You are a workforce optimization expert.

    Employee ID: {assessment["employee_id"]}
    Burnout Risk Level: {assessment["risk_level"]}
    Reason: {assessment["explanation"]}

    Choose ONE action from the list below and explain briefly:
    - REASSIGN
    - REDUCE_LOAD
    - RECOMMEND_BREAK
    - DELAY_DEADLINES

    Respond in ONE sentence.
    Start the sentence with the chosen action.
    """
        
        llm = init_chat_model("groq:llama-3.3-70b-versatile")
        result = llm.invoke(prompt)
        response = result.content
        text = response.upper()

        if text.startswith("REASSIGN"):
                action = "reassign"
        elif text.startswith("REDUCE_LOAD"):
                action = "reduce_load"
        elif text.startswith("RECOMMEND_BREAK"):
                action = "break"
        elif text.startswith("DELAY_DEADLINES"):
                action = "delay"
        else:
                # fallback (safety)
                action = "reduce_load"

        decision : OptimizationDecision = {
            "employee_id" : assessment["employee_id"],
            "recommendation" : action,
            "justification" : response
        }

        decisions.append(decision)
    
    state["optimization_decisions"].extend(decisions)
    return state

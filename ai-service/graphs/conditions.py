def burnout_detected(state):

    assessments = state.get("burnout_assessments",[])
    
    if not assessments: 
        return False

    return any(
        a["risk_level"] in ["high","critical"]
        for a in state["burnout_assessments"]
    )

def has_optimizations(state):
    return len(state.get("optimization_decisions",[])) > 0
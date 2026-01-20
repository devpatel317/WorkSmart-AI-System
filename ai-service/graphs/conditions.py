def burnout_detected(state):
    detected = state.get("burnout_detected", False)
    return bool(detected)

def has_optimizations(state):
    return len(state.get("optimization_decisions",[])) > 0
from graphs.sentinel_graph import sentinel_graph
from state.agent_state import AgentState
from tools.user_tool import get_all_employees
from tools.task_tool import get_tasks_for_employee
from tools.activity_tool import get_last_activity_days
from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route("/", methods=["GET"])
def home():
    return jsonify({"message": "Welcome to the AI Service"})

@app.route("/api/ai/burnout/analyze", methods=["GET"])
def analyze_burnout():
    print("Hello from ai-service!")
    # construct an initial state matching the AgentState TypedDict
    initial_state = {
        "employee_snapshots": [],
        "burnout_assessments": [],
        "optimization_decisions": [],
        "executed_actions": [],
        "burnout_detected" : False
    }
    print(type(initial_state))
    final_state = sentinel_graph.invoke(initial_state)
    print("Final State:", final_state)
    
    return jsonify({
        "employee_snapshots": final_state.get("employee_snapshots",[]),
        "burnout_assessments": final_state.get("burnout_assessments" ,[]),
        "optimization_decisions": final_state.get("optimization_decisions", []),
        "executed_actions": final_state.get("executed_actions",[]),
        "burnout_detected" : final_state.get("burnout_detected")
    })


if __name__ == "__main__":
    app.run(port=8000)
    # days = get_last_activity_days("69533905b32e7454c2494c7f")
    # print("days",days)

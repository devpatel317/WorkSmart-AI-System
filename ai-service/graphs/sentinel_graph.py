from langgraph.graph import StateGraph,END
from state.agent_state import AgentState
from agents.workforce_optimizer_agent import workforce_optimizer_agent
from agents.burnout_predictor_agent import burnout_predictor_agent
from agents.policy_guard_agent import policy_guard_agent
# from agents.executor_agent import executor_agent
from graphs.conditions import burnout_detected
from graphs.conditions import has_optimizations
from IPython.display import Image,display
from agents.observer_agent import observer_agent
from langgraph.prebuilt import interrupt

# def need_approval(state : AgentState):
#     return state.get("approval_required", False)

# create graph builder using stategraph
builder = StateGraph(AgentState)


# Create nodes using builder 
builder.add_node("observer",observer_agent)
builder.add_node("burnout",burnout_predictor_agent)
builder.add_node("optimize",workforce_optimizer_agent)
builder.add_node("policy",policy_guard_agent)
# builder.add_node("executor", executor_agent)


# Create edges in graph

# Entry point
builder.set_entry_point("observer")
# observer -> burnout
builder.add_edge("observer", "burnout")
# burnout decision
builder.add_conditional_edges(
    "burnout",
    burnout_detected,
    {
        True : "optimize",
        False : END
    }
)
# check optimizer output
builder.add_conditional_edges(
    "optimize",
    has_optimizations,
    {
        True : "policy",
        False : END
    }
)
# policy -> HITL or Executor (pause via interrupt when approval required)
# builder.add_conditional_edges(
#     "policy",
#     need_approval,
#     {
#         True : interrupt("WAITING_FOR_MANAGER/ADMIN_APPROVAL"),
#         False : "executor"
#     }
# )
# executor -> END
builder.add_edge("policy",END)

sentinel_graph = builder.compile()


# sentinel_graph.get_graph().print_ascii()
# try:
#     display(Image(sentinel_graph.get_graph().draw_mermaid_png()))
# except Exception:
#     pass


#!/usr/bin/env python3
"""Debug script to test graph execution and Flask endpoint"""

from graphs.sentinel_graph import sentinel_graph
import json

print("=" * 80)
print("TEST 1: Direct graph invocation (like our previous successful test)")
print("=" * 80)

initial_state = {
    "employee_snapshots": [],
    "burnout_assessments": [],
    "optimization_decisions": [],
    "executed_actions": [],
    "burnout_detected": False
}

print("Initial state:", initial_state)
print()

try:
    final_state = sentinel_graph.invoke(initial_state)
    print()
    print("Final state after invoke:")
    print(f"  burnout_detected: {final_state.get('burnout_detected')}")
    print(f"  optimization_decisions: {len(final_state.get('optimization_decisions', []))} items")
    print(f"  executed_actions: {len(final_state.get('executed_actions', []))} items")
    print()
    
    # Check if data exists
    if len(final_state.get('optimization_decisions', [])) > 0:
        print("✓ optimization_decisions HAS DATA")
        print(json.dumps(final_state.get('optimization_decisions', []), indent=2))
    else:
        print("✗ optimization_decisions IS EMPTY")
    
    print()
    
    if len(final_state.get('executed_actions', [])) > 0:
        print("✓ executed_actions HAS DATA")
        print(json.dumps(final_state.get('executed_actions', []), indent=2))
    else:
        print("✗ executed_actions IS EMPTY")
        
except Exception as e:
    print(f"ERROR: {e}")
    import traceback
    traceback.print_exc()

print()
print("=" * 80)
print("TEST 2: Simulating Flask endpoint behavior")
print("=" * 80)

# Simulate what the Flask endpoint does
initial_state_2 = {
    "employee_snapshots": [],
    "burnout_assessments": [],
    "optimization_decisions": [],
    "executed_actions": [],
    "burnout_detected" : False
}

print("Calling sentinel_graph.invoke()...")
final_state_2 = sentinel_graph.invoke(initial_state_2)

# This is exactly what Flask does
response_data = {
    "employee_snapshots": final_state_2.get("employee_snapshots",[]),
    "burnout_assessments": final_state_2.get("burnout_assessments" ,[]),
    "optimization_decisions": final_state_2.get("optimization_decisions", []),
    "executed_actions": final_state_2.get("executed_actions",[]),
    "burnout_detected" : final_state_2.get("burnout_detected")
}

print()
print("Response data (what Flask would return):")
print(json.dumps(response_data, indent=2))

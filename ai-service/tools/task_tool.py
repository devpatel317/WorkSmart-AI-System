import os
import requests
from typing import List, Dict
from dotenv import load_dotenv
load_dotenv()

BASE_URL = os.getenv("BACKEND_URL")
INTERNAL_API_KEY = os.getenv("INTERNAL_API_KEY")


def get_tasks_for_employee(employeeId: str) -> List[Dict]:

    try:
        response = requests.get(
            f"{BASE_URL}/tasks/get-tasks/{employeeId}",
            headers={"x-internal-key": INTERNAL_API_KEY},
        )
        
        response.raise_for_status()
        return response.json()
    except Exception as e:
        print(f"Request failed : {e}")
        return []
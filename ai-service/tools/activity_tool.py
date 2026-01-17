import requests
import os
from dotenv import load_dotenv

load_dotenv()

BASE_URL = os.getenv("BACKEND_URL")
INTERNAL_API_KEY = os.getenv("INTERNAL_API_KEY")

def get_last_activity_days(employeeId : str) -> int:
    response = requests.get(
        f"{BASE_URL}/activity/last-active/{employeeId}",
        headers={
           "x-internal-key": INTERNAL_API_KEY
        }
    )

    response.raise_for_status()
    data = response.json()

    return data["last_active_days"]
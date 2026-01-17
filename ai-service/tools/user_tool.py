import requests
import os
from dotenv import load_dotenv

load_dotenv()

BASE_URL = os.getenv("BACKEND_URL")
INTERNAL_API_KEY=os.getenv("INTERNAL_API_KEY")

def get_all_employees() -> list[dict]:
    response = requests.get(
        f"{BASE_URL}/users/employees",
        headers={
            "x-internal-key" : INTERNAL_API_KEY
        }
    )

    response.raise_for_status()
    return response.json()
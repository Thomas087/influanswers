"""
Utility script to generate JSON schema from Pydantic models.
This helps keep the TypeScript JSON schema in sync with the Pydantic models.
"""
import json
from models import BriefResponse

if __name__ == "__main__":
    # Generate JSON schema from Pydantic model
    schema = BriefResponse.model_json_schema()
    
    # Print formatted JSON schema
    print(json.dumps(schema, indent=2))
    
    # Optionally save to file
    with open("schema.json", "w") as f:
        json.dump(schema, f, indent=2)
    
    print("\nSchema saved to schema.json")
    print("\nNote: You'll need to manually update the TypeScript schema in index.ts")
    print("to match this structure, especially for enum values.")

